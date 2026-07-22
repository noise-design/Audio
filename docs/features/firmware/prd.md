# PRD — F-FIRMWARE: Firmware OTA

**Status:** stub (acceptance criteria confirmed from code where marked ✓; others TODO(product)).
**Owning screens:** `firmwareUpdateFragment`, `firmwareTestFragment`. **Endpoint:** `POST /core/audio/firmware-versions`. **Deep detail:** [../../../memory/hardware/protocols.md](../../../memory/hardware/protocols.md).

## Summary
Check for and apply firmware updates to the connected device over the chip-specific OTA transport (BES / Max / JL / ALT-OWS).

## Declares (acceptance criteria)
- **AC-1 ✓** App fetches available firmware version via `/core/audio/firmware-versions` and compares to the device's current version (`FirmwareUpdateViewModel.getFirmwareVersion()`, version diff `:464-465`).
- **AC-2 ✓** Update is blocked unless a battery/connection precheck passes (`checkPassBeforeFirmwareStart()`).
- **AC-3 ✓** Soft-update reminder cadence is 24/48/72h (`shouldShowSoftUpdate()`).
- **AC-4 ✓** Force-OTA can be armed at app launch (`SessionManager.forceOtaFlowRunning`, `SplashViewModel.kt:140-144`).
- **AC-5 ✓** Progress reflects `OTAStatus` (STARTED→UPDATING→VERIFYING→REBOOT→SUCCEED / FAILED).
- **AC-6 ✓** Success/failure emit `firmware_update_success` / `firmware_update_failed` with `current_firmware`.
- **AC-7 TODO(firmware)** JL-chip OTA reliability — resolve ADR-016 (empty pre-OTA cmd, error 4114 workarounds) and specify expected behavior.
- **AC-8 TODO(product)** Minimum battery %, retry policy, and rollback behavior on failed verify.

## Out of scope / risks
Chip-specific quirks (ADR-016) make JL devices (`HW-ALT-BUDS`, `HW-ALT-BUDS-S`) degraded for OTA — see [feature-map.json](../../../src/hardware/feature-map.json).
