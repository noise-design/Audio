# Platform Ledger — Android

**Owned & updated by:** the Android team. **Same-PR rule:** any PR touching feature `F-X` updates [/src/platforms/parity.json](../../src/platforms/parity.json) in the same PR.

This is the only platform present in this repo. `com.noise.audio`, versionName **4.7.3**, versionCode **473**, minSdk 24, target/compileSdk 35, Java 11.

## Conventions actually used (evidence)
- **Architecture:** MVVM + Repository + Hilt, coroutines/Flow. `BaseViewModel` exposes `LiveData<Event<…>>` (`_message/_loading/_apiError`). Repos return `Flow<Resource<BaseApiResponse<T>>>`; VMs collect in `viewModelScope.launch(Dispatchers.IO)`. **No UseCase layer.** Detail: [../architecture/system.md](../architecture/system.md), [../architecture/state-management.md](../architecture/state-management.md).
- **UI:** View-first (Fragments/XML + databinding + viewbinding). Jetpack Navigation (XML nav graphs, custom `MyFragmentNavigator`). Compose is marginal (4 screens via `BaseComposeFragment`: About, AppLanguage, BackgroundManagement, Faq).
- **DI modules:** `di/AppModule`, `NetworkModule`, `RoomModule`, `LocalModule` (+ `common/di/AudioModule`).
- **Networking:** Retrofit + Gson + OkHttp; `APIService` (fixed paths) + dynamic `@Url` calls; separate `TokenRefreshApi` client. Base = `BuildConfig.BASE_URL` (flavors: `live`=app.gonoise.com, `staging`=stage-app.gonoise.com).
- **Persistence:** Room `noisefit-audio-db` v2 (`KeyValue`, `CachedVideo`) + two SharedPreferences files (`DataStored*` app, `noise_fit_Audio` common). **No Jetpack DataStore** despite class names.
- **Serialization:** Gson `@SerializedName` only (no kotlinx.serialization).
- **Analytics:** Firebase only, via `SessionManager.fireBaseAppEvent()`; registry `utils/FireBaseAppEvents.kt`. See [../analytics/event-taxonomy.md](../analytics/event-taxonomy.md).
- **i18n:** `text_` snake_case keys; custom `LocaleHelper`; 17 locales. See [../voice/locale-rules.md](../voice/locale-rules.md).
- **Logging:** Timber + elvishew xlog; `common/.../AppLogs.kt` sends BLE/OTA diagnostics to backend (separate from analytics).
- **Libs:** Lottie, ExoPlayer 2.19, Glide, EventBus, markwon (markdown → AI chat), ucrop, WorkManager, Credentials/GoogleID.

## Quirks
- Two SharedPreferences stores + Room, no single storage abstraction.
- `EventBus` (greenrobot) coexists with LiveData/Flow — mixed event models.
- WorkManager background workers (`RescueServiceInBgWorker`, `LocationWorker`) with hardcoded notification copy (see voice violations).
- Foreground services for AI/mic/media/connected-device.

## Known gaps / tech debt (→ ADRs)
- **ADR-001** release keystore secrets committed in `build.gradle.kts` (security).
- **ADR-002/013** ~255 `DeviceType` model-branches; `sdk_type` unused.
- **ADR-006** Compose has no token layer; `dynamicColor=true`.
- **ADR-007** V1/V2 duplication (login/pairing/profile/settings/touch/device-setup).
- **ADR-012** motion magic numbers, no reduced-motion.
- **ADR-014** dead `UIController.logAppEvent` path; MoEngage naming, no SDK.
- **ADR-017** "noisefit"/"noise_fit" legacy names.

## Deviations from shared spec
- No `screen_view` analytics (ADR-015) — uses `*_landing` events.
- Firmware envelope diverges from `BaseApiResponse` (ADR-005).
