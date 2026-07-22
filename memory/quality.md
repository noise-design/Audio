# Quality Bar — Testing, A11y, Privacy, Security

Single file; split if it grows. States the bar + current reality (evidence).

## Testing
**Current reality:** near-zero automated coverage. `app/src/test` and `androidTest` hold template `ExampleUnitTest`/`ExampleInstrumentedTest`; the only real unit test is `TranscriptionTimerThresholdTest` (+ `ui/ai`, `ui/home/fragment/touch` test dirs). No repository/ViewModel/instrumentation suite.

**Bar (proposed — `TODO(eng)` to ratify):**
- Unit tests for every ViewModel state transition and repository `Resource` branch.
- Device-logic tests for capability resolution (esp. before ADR-002 refactor) using [/data/fixtures/entities/](../data/fixtures/entities/).
- No new feature merges without tests for its PRD acceptance criteria ([/docs/features/](../docs/features/)).

## Accessibility
**Current reality:** RTL supported (`drawable-ldrtl-*`, ar/he). **No reduced-motion handling anywhere** (ADR-012). Touch-target sizes / content descriptions not audited.

**Bar (proposed):** WCAG-style — min 48dp touch targets, content descriptions on all interactive/icon-only controls, honor reduced-motion (mandatory, [.claude/rules/motion.md](../.claude/rules/motion.md)), color-contrast check on the token palette, TalkBack pass on core flows.

## Privacy (tie collected data to the event registry)
- **Analytics:** Firebase events ([/src/analytics/events.schema.json](../src/analytics/events.schema.json)) + user properties (`SessionManager.setFirebaseUserAttributes`). `TODO(privacy)`: audit that no event prop carries PII (event props are inline literals — ADR-011 — so audit is manual).
- **Sensitive permissions:** `RECORD_AUDIO` + speech recognition (AI voice/transcription), `ACCESS_FINE/COARSE_LOCATION` (BLE scan + `LocationWorker`), `CAMERA` (profile/warranty image), Bluetooth, `NotificationListenerService`.
- **AI data:** consent surfaced via `text_noise_ai_consent_body` + `NoiseAiConsentBottomSheet`; audio/inputs sent to `*.gonoise.com`. No client-side redaction.
- **Bar:** every new event/permission documented here + in the registry; consent required before AI capture (already present) and before location.

## Security
- **CRITICAL — ADR-001:** release keystore `storePassword`/`keyAlias`/`keyPassword` and debug keystore password are **hardcoded in `app/build.gradle.kts`** and committed. `GOOGLE_CLIENT_ID` inlined as a build field. **Rotate + move to secret store.** This is the top security action.
- **Good:** BLE control channel is encrypted (AES + SHA256, `besSdk/.../utils/sha/`); DEBUG-only HTTP/curl logging (not in release); per-user bearer/guest auth on AI sockets; token refresh isolated to its own client.
- **Bar:** no secrets in VCS; no PII in logs (Timber/xlog); certificate/URL config from build flavors only; validate all `@Url` dynamic endpoints stay on `*.gonoise.com`.

## Gate
Pre-commit checklist aggregated in [.claude/rules/](../.claude/rules/) (each rule has its own grep + checklist).
