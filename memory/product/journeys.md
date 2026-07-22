# User Journeys (J-&lt;FLOW&gt;-##)

> **Inferred from code.** These journeys are **reconstructed from navigation-graph order + Splash routing** (`res/navigation/*.xml`, `SplashActivity.kt:210-229`). They reflect what the code *does*, not confirmed product intent. `TODO(product)`: confirm/annotate. Step IDs are stable; cross-reference screens by `S-*` ([design/screens.md](../design/screens.md)) and events by key ([analytics/trigger-map.md](../analytics/trigger-map.md)).

## J-ONBOARD — first-time setup (inferred)
Splash branches on `UserOnBoardingFlow`: `ASK_FOR_LOGIN` → login, `DEVICE_SEARCH` → pairing, `DASHBOARD` → home.

| Step | Screen | Evidence | Event |
|---|---|---|---|
| J-ONBOARD-01 | Splash + privacy sheet | `SplashActivity.kt:34`, `PrivacyBottomDialogFragment` | — (ADR-015: no view event) |
| J-ONBOARD-02 | Login landing | `LoginFragmentV2.kt:68` (start of `login_navigation`) | `login_page_landing` |
| J-ONBOARD-03 | Email/phone entry | `EmailLoginFragment.kt:25` / `PhoneLoginFragment.kt:28` | `email_login_enter_email_landing` |
| J-ONBOARD-04 | OTP verify | `EmailOtpFragment.kt:37` / `PhoneOtpVerifyFragment.kt:33` | `otp_continue_click`, `otp_invalid_input` |
| J-ONBOARD-05 | Create profile | `UserProfileFragment.kt:30` | `profile_create_continue_click` |
| J-ONBOARD-06 | Scan for device | `ScanningFragment.kt:27` (start of `navigation_pair_v2`) | `nearby_device_scan_landing` |
| J-ONBOARD-07 | Set up your device | `SetUpYourDeviceFragment.kt:21` | — |
| J-ONBOARD-08 | Found-device list | `FindDeviceListV2Fragment.kt:58` | `nearby_device_found_select_click` |
| J-ONBOARD-09 | Pairing | `PairingFragmentV2.kt:49` | `device_pairing_success` / `device_pairing_failed` |
| J-ONBOARD-10 | Meet your device | `MeetDeviceFragment.kt:22` | `meet_your_buds_continue_click` |
| J-ONBOARD-11 | Walkthrough | `WalkThroughParentFragment.kt:21`, `PersonalizedFragment.kt:21` | `personalize_device_landing` |
| J-ONBOARD-12 | Home dashboard | `HomeFragment.kt:98` (start of `home_navigation`) | `home_device_connected` |

Legacy V1 path (`navigation_pair`: `FindDeviceListFragment`→`PairingFragment`) still present but not routed to (ADR-007).

## J-PAIR — pair an additional/returning device (inferred)
From Home: `home_dual_pairing_click` → `DualPairingFragment` (`F-DUAL`), or Settings → switch device → `PairDeviceActivityV2` (reuses J-ONBOARD-06…10). Permission gates: `BleDisabledFragment` (`bt_permission_landing`), `PermissionRequestFragment` (`location_permission_landing`).

## J-AI-CHAT — text assistant (inferred)
J-AI-CHAT-01 AI home (`AIHomeFragment`, `ai_companion_click`) → 02 consent (`NoiseAiConsentBottomSheet`, first run) → 03 chat (`AiTextChatFragment`, `ai_companion_landing`) → 04 send (`ai_companion_send_click`) → 05 stream response (`ai_companion_output_generated` / `ai_companion_output_failed`) → limit dialog on 429 (`AiLimitReachedDialogFragment`). History: `ChatHistoryFragment` (`ai_history_chat_click`).

## J-AI-VOICE — voice assistant (inferred)
J-AI-VOICE-01 activate on device (`ActivateAiOnDeviceFragment`) → 02 calibration (`AudioAiCalibrationFragment`) → 03 tap-to-speak (`AudioAiFragment`, `ai_voice_chat_taptospeak_click`) → streams PCM over `wss://…/audio/ai/v1/voice`; 30s idle auto-stop. See [architecture/ai-integration.md](../architecture/ai-integration.md).

## J-AI-TRANSCRIBE — live transcription (inferred)
Start (`WsTranscribeFragment`) → live transcript (cloud WS or on-device `SpeechRecognizer`) → detail/summary (`TranscriptionDetailsFragment`, `/summarize/{id}`) → history (`TranscriptionHistoryFragment`); time-based quota (green/yellow/red).

## J-FIRMWARE — OTA update (inferred)
From Settings (`settings_firmware_update_click`) → `FirmwareUpdateFragment` (`firmware_update_device_click`) → battery/connection precheck → OTA (`OTAStatus`: UPDATING→VERIFYING→REBOOT→SUCCEED) → `firmware_update_success` / `firmware_update_failed`. Force-OTA can be triggered at Splash (`forceOtaFlowRunning`). Chip-specific quirks: ADR-016.

## J-DEVICE-CONTROL — everyday control (inferred)
From Home: ANC (`ancFragment`), EQ (`equalizerFragment`/`equalizerMaxFragment`), Sound (`soundControlsFragment`, `audioBoostFragment`), Touch (`touchGestureV2`), Motion (`motionControlInfoFragment`), Find My (`findMyEarBudsFragment`/`findMyHeadPhoneFragment`). Each is gated by device capability — see [hardware/feature-matrix.md](../hardware/feature-matrix.md).

## Gaps / TODO(product)
- No journey covers **account deletion / logout** as a flow (endpoints exist: `/auth_v2/logout`, `/disable/account`).
- **Warranty** (`F-WARRANTY`) and **Rate & Earn** (`F-RATE-EARN`) journeys not yet mapped — TODO.
- Confirm whether J-AI-* require a paired device or work standalone.
