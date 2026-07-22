# Funnels

Derived from the trigger map. `TODO(data)`: confirm these are the funnels the business tracks; several steps are unmeasurable today (see gaps).

## Activation funnel (J-ONBOARD)
`login_page_landing` → `otp_continue_click` → **[no auth-success event — GAP]** → `nearby_device_scan_landing` → `nearby_device_found_select_click` → `device_pairing_success` → `home_device_connected`.
- **Measurable:** landing→OTP, scan→select→pair→home.
- **Blind spot:** OTP→scan (login completion / account creation).

## Pairing funnel
`nearby_device_scan_landing` → `nearby_device_found_select_click` → `device_pairing_success` (vs `device_pairing_failed`). Retry paths (`ScanTryAgain`, `DidntFindYours`) not evented.

## AI chat funnel
`ai_companion_click` → `ai_companion_landing` → `ai_companion_send_click` → `ai_companion_output_generated` (vs `_failed`). Consent + limit not evented.

## Firmware funnel
`settings_firmware_update_click` → `firmware_update_device_click` → `firmware_update_success` (vs `_failed`). No intermediate OTAStatus stages.

## TODO(data)
- Define target conversion rates per funnel.
- Fill the GAPs in [trigger-map.md](trigger-map.md) so activation and voice-session funnels become measurable.
- Confirm whether Firebase funnels or an external warehouse is the analysis surface.
