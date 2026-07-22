# Decisions & Open Conflicts (ADR log)

Every code/doc contradiction or duplication found during bootstrap is logged here as an `ADR-###` with status **OPEN**. Agents and humans must **flag, not silently decide** — do not pick a winner in code without resolving the ADR here first. Use [/templates/adr-template.md](../templates/adr-template.md) for new entries.

Status legend: OPEN (needs a human decision) · ACCEPTED · SUPERSEDED · REJECTED.

| ID | Title | Severity | Status | Owner |
|---|---|---|---|---|
| ADR-001 | Release keystore & store passwords hardcoded in build script | **security-critical** | OPEN | security/release |
| ADR-002 | Capability gating by `DeviceType` model-branching, not `DeviceFeatures` | high | OPEN | android/hardware |
| ADR-003 | "Device" entity modeled 3+ divergent ways | high | OPEN | android+backend |
| ADR-004 | `DeviceFeatures` identifier collision (enum vs data class) | medium | OPEN | android |
| ADR-005 | API response envelope duplicated 4 ways | medium | OPEN | android+backend |
| ADR-006 | Compose has no token layer; `dynamicColor=true` overrides brand | high | OPEN | design/android |
| ADR-007 | Legacy v1/v2 screen duplication across flows | medium | OPEN | android |
| ADR-008 | "Luna" persona/copy leftover from forked fitness app | high | OPEN | product/ai |
| ADR-009 | i18n key duplication (`text_`-prefixed vs unprefixed legacy) | low | OPEN | android/loc |
| ADR-010 | Locale folder issues: `values-kr` mislabeled; `he`+`iw` both present | medium | OPEN | android/loc |
| ADR-011 | Analytics event-name inconsistencies + no shared param keys | low | OPEN | android/data |
| ADR-012 | Motion: magic-number durations, no tokens, no reduced-motion | medium | OPEN | design/android |
| ADR-013 | `sdk_type` field exists end-to-end but unused for routing | low | OPEN | android/hardware |
| ADR-014 | Dead analytics path + MoEngage naming with no MoEngage SDK | low | OPEN | android/data |
| ADR-015 | No `screen_view` analytics; approximated by `*_landing` events | low | OPEN | data |
| ADR-016 | JL-chip OTA quirks (empty pre-OTA cmd, error-4114 no-op workarounds) | medium | OPEN | firmware |
| ADR-017 | "noisefit"/"noise_fit" DB & prefs names leftover from NoiseFit heritage | low | OPEN | android |
| ADR-018 | `NetworkConstants.BASE_URL` defined but unused (BuildConfig wins) | low | OPEN | android |

---

## ADR-001 — Release keystore & store passwords hardcoded in build script
**Status:** OPEN · **Severity:** security-critical
**Context:** [app/build.gradle.kts](../app/build.gradle.kts) `signingConfigs.release` hardcodes `storePassword`, `keyAlias`, `keyPassword` in plaintext, committed to git. The debug keystore password is also inline. A `GOOGLE_CLIENT_ID` is inlined as a `buildConfigField`.
**Conflict:** Committed release-signing secrets violate any reasonable security bar (see [quality.md](quality.md)).
**Options (not decided):** (a) move to `~/.gradle/gradle.properties` / CI secret store + `System.getenv`; (b) rotate the keystore credentials since they are already exposed in history. **Do not decide here.**
**Question for owner:** Should the keystore be rotated given git-history exposure, and where should CI read the passphrase from?

## ADR-002 — Capability gating by `DeviceType` model-branching, not `DeviceFeatures`
**Status:** OPEN · **Severity:** high
**Context:** A clean capability enum exists (`common/.../data/local/DeviceFeatures.kt`, 19 flags) and a query-action taxonomy (`common/.../interfaces/QueryAction.kt`), but ~**255** feature decisions branch on the `DeviceType` model enum instead. Concentrations: [AudioSDK.kt](../app/src/main/java/com/noise/audio/audio/AudioSDK.kt) (104), `bes/.../BesUpdateDeviceUnitsHandler.kt` (24), `EqualizerMaxViewModel.kt` (23), `BesQueryDeviceUnitsHandler.kt` (16), `HomeFragment.kt` (10).
**Conflict:** Adding a new `HW-*` requires editing ~25 files. The capability abstraction is bypassed.
**Question for owner:** Adopt capability-set-per-device (attached to catalog/`AudioDevice`) as the single gate? See gate in [.claude/rules/hardware.md](../.claude/rules/hardware.md). Full hit list: `[F-*]` gating sites in that rule file.

## ADR-003 — "Device" entity modeled 3+ divergent ways
**Status:** OPEN · **Severity:** high
**Context:** Four shapes for one concept: `common/.../model/ColorFitNetworkDevice.kt` (network DTO), `common/.../model/AudioDevice.kt` (persisted/runtime, ~35 fields), `data/model/AllDeviceModel.kt` (UI sealed wrapper), `data/model/response/UnsupportedDevice` (`DeviceListResponse.kt:30`). No shared supertype; conversion is manual.
**Question for owner:** Introduce a single domain `Device` with explicit DTO↔domain↔UI mappers? See [architecture/data-models.md](architecture/data-models.md).

## ADR-004 — `DeviceFeatures` identifier collision
**Status:** OPEN · **Severity:** medium
**Context:** `app/.../data/model/DeviceFeatures.kt` is a **data class** with a single field `sleep_data: Int` (the `/device_features` API response). `common/.../data/local/DeviceFeatures.kt` is the **capability enum**. Same name, unrelated concepts.
**Question for owner:** Rename the API DTO (e.g. `DeviceFeatureFlags`/`SleepDataResponse`) to remove the collision.

## ADR-005 — API response envelope duplicated 4 ways
**Status:** OPEN · **Severity:** medium
**Context:** `data/base/BaseApiResponse.kt` (`message/data/error/errors`) vs `data/model/base/BaseResponse.kt`+`BaseDataResponse.kt` vs `data/model/response/BaseApiResponseImage.kt` vs a bespoke `FirmwareVersionResponse` (`success/data/message/time`).
**Question for owner:** Consolidate to one generic envelope.

## ADR-006 — Compose has no token layer; `dynamicColor=true` overrides brand
**Status:** OPEN · **Severity:** high
**Context:** The brand palette lives entirely in `res/values/colors.xml` (100+ tokens). `ui/theme/Color.kt` holds only 6 unused Material-template purples; `ui/theme/Theme.kt` sets `dynamicColor = true` (Android 12+ paints from wallpaper, ignoring brand). Compose screens redefine colors as local `private val`s, duplicating XML hexes (`#43555E` appears under 8+ names). No Compose spacing/type tokens exist.
**Question for owner:** Generate a shared Compose token layer from `colors.xml` and set `dynamicColor = false`? See [design/tokens.md](design/tokens.md) + [.claude/rules/design-system.md](../.claude/rules/design-system.md).

## ADR-007 — Legacy v1/v2 screen duplication
**Status:** OPEN · **Severity:** medium
**Context:** Parallel implementations coexist: `LoginFragment`/`LoginFragmentV2`, `ui/pairing`/`ui/pairingV2`, `UserInfoFragment`/`V2`, `UserEditInfoFragment`/`V2`, `SettingsFragment`/`V2`, `TouchGesturesFragment`/`TouchGestureFragmentV2`, `DeviceSetupVideoFragment`/`V2`. Splash currently routes to V2; V1 is largely dead (V1 pairing commented out `SplashActivity.kt:220`).
**Question for owner:** Delete confirmed-dead V1 code paths. See [platforms/android.md](platforms/android.md) tech-debt.

## ADR-008 — "Luna" persona/copy leftover from forked fitness app
**Status:** OPEN · **Severity:** high
**Context:** [AiChatViewModel.kt:122](../app/src/main/java/com/noise/audio/ui/ai/AiChatViewModel.kt) hardcodes a greeting: assistant "Luna … AI coach … nutritional advice, workout questions … Luna ring". [app/build.gradle.kts:95](../app/build.gradle.kts) comment confirms this repo is derived from a "Luna app". The greeting's sender `sendInitMessage()` is commented out, so it is display-code only, but the copy is wrong-brand and wrong-domain (fitness ring vs audio).
**Question for owner:** Confirm the AI assistant's canonical name/persona for Noise Audio (see [voice/ai-personas.md](voice/ai-personas.md)) and purge Luna/fitness copy.

## ADR-009 — i18n key duplication
**Status:** OPEN · **Severity:** low
**Context:** Many keys exist both `text_`-prefixed and unprefixed (`text_welcome`+`welcome`, `text_action_sign_in`+`action_sign_in`, `text_invalid_email_id`+`invalid_email_id`). Also auto-generated sentence-length keys.
**Question for owner:** Pick `text_` snake_case as canonical, delete unprefixed duplicates. See [voice/locale-rules.md](voice/locale-rules.md).

## ADR-010 — Locale folder issues
**Status:** OPEN · **Severity:** medium
**Context:** `res/values-kr/` is non-standard (Android Korean is `ko`; `kr` will not resolve on a Korean device). Both `values-he` (1153) and `values-iw` (1144) exist; `LocaleHelper.kt:13` normalizes `he`→`iw` at runtime, making `values-he` partly redundant.
**Question for owner:** Rename `values-kr`→`values-ko`; consolidate `he`/`iw`. See [voice/locale-rules.md](voice/locale-rules.md).

## ADR-011 — Analytics event-name inconsistencies + no shared param keys
**Status:** OPEN · **Severity:** low
**Context:** `login_terms_and_Conditions_optin`/`optout` carry a capital `C` (masked at runtime by `.lowercase()` in `SessionManager.fireBaseAppEvent`); `setting_profile_click` (singular) vs `settings_*`; `touch_gesture_action_click` (singular) vs `touch_gestures_*`; `home_anc_anc_click` stutter; all param keys are inline string literals (`"device_name"`, `"toggle_state"`, `"anc_level"`) with no constants; `find_my_device_play_click` overloaded across buds/headphones via a prop.
**Question for owner:** Adopt the naming rules in [analytics/event-taxonomy.md](analytics/event-taxonomy.md) and extract param-key constants.

## ADR-012 — Motion: magic-number durations, no tokens, no reduced-motion
**Status:** OPEN · **Severity:** medium
**Context:** ~13 distinct duration magic numbers (0/120/160/180/250/300/360/400/500/600/900/1000/2000 ms); "300" defined 3 ways (`ANIMATION_DURATION_MS`, `dimens animation_duration`, raw literals); 3 duplicated local duration constants; 5 easing/interpolator types with no convention; **no reduced-motion (`Settings.Global.ANIMATOR_DURATION_SCALE` / accessibility) handling anywhere**.
**Question for owner:** Adopt [/src/tokens/motion.tokens.json](../src/tokens/motion.tokens.json) + mandatory reduced-motion. See [.claude/rules/motion.md](../.claude/rules/motion.md).

## ADR-013 — `sdk_type` field unused for routing
**Status:** OPEN · **Severity:** low
**Context:** `sdk_type` exists on `ColorFitNetworkDevice` and `AudioDevice` but routing is done by `DeviceType` name; only literal `"zh"` is ever written (`SearchNearbyDeviceViewModel.kt:233`). Related to ADR-002.
**Question for owner:** Either drive controller routing from `sdk_type` or remove the dead field.

## ADR-014 — Dead analytics path + MoEngage naming with no SDK
**Status:** OPEN · **Severity:** low
**Context:** `ui/base/UIController.logAppEvent(...)` is overridden as an **empty stub** in every activity; not wired to Firebase. Log tags `LOGS_MOENGAGE_EVENT` and a backend flag `moengage_banner` exist but **no MoEngage SDK dependency** is present. Live analytics path is exclusively `SessionManager.fireBaseAppEvent`.
**Question for owner:** Remove dead `logAppEvent` stubs and MoEngage naming, or (re)introduce the intended SDK.

## ADR-015 — No `screen_view` analytics
**Status:** OPEN · **Severity:** low
**Context:** No Firebase `setCurrentScreen`/`SCREEN_VIEW`. Screen entry is approximated by ~9 custom `*_landing` events, so most screens have no view event.
**Question for owner:** Adopt standard screen-view tracking or a consistent `*_landing` convention for all `S-*`. See [analytics/trigger-map.md](analytics/trigger-map.md).

## ADR-016 — JL-chip OTA quirks
**Status:** OPEN · **Severity:** medium
**Context:** `bes/.../handler/BesUpdateDeviceUnitsHandler.kt:90-100` — `JL_PRE_OTA_COMMAND_HEX = ""` (empty ⇒ OTA handshake "fails silently"); `JL_USE_AUTH_DEVICE = true` must match firmware or "error 4114 / SUB_ERR_REMOTE_NOT_CONNECTED". `bes/.../ota/JLSppOtaManager.kt:120-132` — connect/disconnect deliberately no-op to avoid duplicate-state error 4114. These are workarounds around firmware/SDK behavior.
**Question for owner (firmware):** Confirm the correct pre-OTA command hex and auth config per JL firmware build. See [hardware/protocols.md](hardware/protocols.md).

## ADR-017 — "noisefit"/"noise_fit" names leftover from NoiseFit heritage
**Status:** OPEN · **Severity:** low
**Context:** Room DB `"noisefit-audio-db"`, common prefs `"noise_fit_Audio"`, `common/.../NoisefitApplication.kt`. Naming heritage from Noise's fitness app; harmless but confusing.
**Question for owner:** Rename on next migration, or accept and document.

## ADR-018 — `NetworkConstants.BASE_URL` unused
**Status:** OPEN · **Severity:** low
**Context:** A `NetworkConstants.BASE_URL` const (stage) exists but Retrofit uses `BuildConfig.BASE_URL`; the const is dead/misleading.
**Question for owner:** Remove the const or route Retrofit through it.

# --- Design-system migration ADRs (2026-07-20, renumbered from 001-004 to avoid collision with codebase ADRs above) ---

## ADR-019 — Noise-Audio (Jul 10) is the canonical design-system source (2026-07-20)
Two legacy repos mirrored the same Figma page. `Noise-Audio` (Jul 10): 26 components, verbatim metadata,
fingerprints, graph.json, AGENT.md, verified ingestion. `noiseAudio` (Jul 7): 16 components but with coded
HTML/CSS. Decision: Noise-Audio is the base for all metadata/values; superseded repo kept untouched.

## ADR-020 — Coded components merged in from noiseAudio (2026-07-20)
The 16 coded .html/.css implementations were copied to `src/components/code/<id>/`. Metadata comes ONLY from
the canonical yaml files; the legacy per-folder yaml files were deliberately NOT copied (one home per fact).
10 components remain metadata-only: action-card, action-sheet, card-heading, description,
image-asset-placeholder, modal-card, modal-sheet, privacy-policy-tab, progress-bar, text-field.

## ADR-021 — Token naming: Jul 10 canonical + legacy alias layer (2026-07-20)
The two syncs used different CSS var names (`--token-text-primary` vs `--text-primary`). Canonical =
Jul 10 names. A compatibility alias block (55 aliases) was appended to tokens.css so legacy coded
components work unmodified. New code must use canonical names (GATE-DS-4).
CONFLICT FIXED: legacy radio-button css referenced `--token-button-radio-off-stroke` but the token was
defined as `...offstroke` — a dangling var in the legacy repo. Alias added for both spellings.

## ADR-022 — i18n consolidated to src/i18n (2026-07-20)
`noise-audio-i18n/` working copy was identical to `src/i18n/` (diff clean). src/i18n is the single home;
worklist scripts live in scripts/i18n/.

## Open (designer to decide)
- CONTROL_PANEL.md was never provided (see ingestion report §4). Screen state-panel rules undefined.


## ADR-023 — OPEN: Two design-token canonicals (Figma DLS vs shipping Android app)
`src/tokens/design.tokens.js` (Figma DLS, Jul 10 sync — the design target) and `src/tokens/design.tokens.json`
(extracted from the Android codebase — what ships today, see ADR-006: no Compose token layer, colorway-organized
XML colors) describe DIFFERENT realities with different naming and values. Same for motion: `motion.tokens.js`
(stub) vs `motion.tokens.json` (extracted durations, ADR-012). Per rule "flag, don't decide": both kept.
OWNER: design + android leads to converge the app onto the DLS tokens.

## ADR-024 — OPEN: Two string schemas (new i18n system vs Android strings.xml reality)
`src/i18n/strings.schema.json` = the NEW i18n system (837 en keys, en/de/hi, domain files) built Jul 20.
`src/i18n/strings.android.schema.json` = documentation of the shipping app's strings.xml (1155 keys, 17 locales,
ADR-009/010 issues). They use different key conventions (camelCase domains vs text_snake_case). OWNER: decide
migration path from android keys to the new system (or vice versa).

## ADR-025 — OPEN: Duplicate template pairs after merge
Scaffold templates (device-entry, event-registration, feature-prd, motion-pattern, persona-card) overlap in purpose
with codebase-bootstrap templates (new-device, new-event, new-feature, new-motion-pattern, new-persona). Both sets
kept; consolidate to one set and update references.
