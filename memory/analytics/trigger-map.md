# Trigger Map (journey step → event)

Maps journey steps ([../product/journeys.md](../product/journeys.md)) to registry events ([/src/analytics/events.schema.json](../../src/analytics/events.schema.json)). **Gaps are called out explicitly** — they are the instrumentation backlog.

## J-ONBOARD
| Step | Event(s) | Gap |
|---|---|---|
| J-ONBOARD-01 Splash | — | **GAP: no splash/privacy event** (ADR-015) |
| J-ONBOARD-02 Login landing | `login_page_landing` | — |
| J-ONBOARD-03 Email/phone entry | `email_login_enter_email_landing` | phone-entry landing missing |
| J-ONBOARD-04 OTP | `otp_continue_click`, `otp_invalid_input` | **GAP: no otp_success event** |
| J-ONBOARD-05 Profile | `profile_create_continue_click` | — |
| J-ONBOARD-06 Scan | `nearby_device_scan_landing` | — |
| J-ONBOARD-07 Set up | — | **GAP: no setup-screen event** |
| J-ONBOARD-08 Found list | `nearby_device_found_select_click` | — |
| J-ONBOARD-09 Pairing | `device_pairing_success` / `device_pairing_failed` | — |
| J-ONBOARD-10 Meet device | `meet_your_buds_continue_click` | — |
| J-ONBOARD-11 Walkthrough | `personalize_device_landing` | walkthrough completion missing |
| J-ONBOARD-12 Home | `home_device_connected` | — |

**Funnel-critical gap:** between J-ONBOARD-04 (OTP) and J-ONBOARD-06 (scan) there is no explicit "login success / account created" event — login→pairing drop-off is not directly measurable.

## J-AI-CHAT
`ai_companion_click` (01) → **GAP: no consent-accept event** (02) → `ai_companion_landing` (03) → `ai_companion_send_click` (04) → `ai_companion_output_generated`/`_failed` (05). Limit dialog has no event.

## J-AI-VOICE
`ai_voice_chat_taptospeak_click` only. **GAP:** no activate/calibration/connect/idle-timeout events → voice session funnel not measurable.

## J-FIRMWARE
`settings_firmware_update_click` → `firmware_update_device_click` → `firmware_update_success`/`_failed`. **GAP:** no per-`OTAStatus`-stage events (can't see where OTA fails).

## J-DEVICE-CONTROL
Well-instrumented: ANC (`home_anc_*`), EQ (`equalizer_*`), sound (`sound_*`, `audio_boost_*`), touch (`touch_gestures_*`), motion, dual, find-my. See registry.

## Overall gaps
- No screen-view baseline (ADR-015) → most `S-*` have no entry event.
- Auth-success, OTA-stage, and voice-session lifecycle are the biggest measurement holes.
