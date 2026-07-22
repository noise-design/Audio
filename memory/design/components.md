# Components (reusable)

Inventory of reusable UI components found in code. Mostly custom Views (the app is View-first). `TODO(design)`: consolidate props/behavior specs; there is no standardized empty/error/loading component.

## Custom Views (`ui/customviews/`, `ui/customView/`, `customviews/`)
| Component | File | Purpose / notable props |
|---|---|---|
| NoiseChargingProgressView | `customviews/NoiseChargingProgressView.kt` | Battery ring, percent (0-100, -1=unknown/off) — `:48-69` |
| CustomProgressBar | `customviews/CustomProgressBar.kt` | EQ band bar; hardcoded labels "BASS"/"MID"/"TREBLE" `:55-59` (voice violation) |
| EqualizerView | `ui/customView/EqualizerView.kt` | Interactive EQ curve; animates (180/300ms) |
| AudioBarsView | `ui/customView/AudioBarsView.kt` | Audio level bars; anim 120/360ms |
| TopStatusBanner | `ui/base/TopStatusBanner.kt` | Connection/status banner; `ANIMATION_DURATION_MS=300L` |
| NoiseCollapsingScaffold | `ui/base/NoiseCollapsingScaffold.kt` | Compose collapsing toolbar; lerp 32→24sp title |

## Base classes (`ui/base/`)
`BaseActivity`, `BaseFragment`, `BaseViewModel` (`LiveData<Event<…>>`), `BaseComposeFragment` (View↔Compose bridge), `MyNavHostFragment`/`MyFragmentNavigator`, `UIController` (dead `logAppEvent`, ADR-014), `BaseBottomSheetWithTransparent`.

## Dialogs / bottom sheets (~30)
Permission (PermissionRequest, BleDisabled, NoDeviceFound), AI (NoiseAiConsent, AiLimitReached, DeleteChat, transcription share/edit/discard/delete/limit), settings/profile (DeviceSettings, CallSupport, Date, ImagePicker, AvatarPicker/Actions, ProfileConfirmation), app/warranty (AppUpdate*, PurchaseChannel, Invoice), RateEarn.

## Gaps
- No shared **empty/error/loading** component — each screen rolls its own (see [flows.md](flows.md)).
- Compose components redeclare colors/type locally (ADR-006).
- `TODO(design)`: document each component's variants, states, and a11y (labels, touch targets) — tie to [../quality.md](../quality.md).
