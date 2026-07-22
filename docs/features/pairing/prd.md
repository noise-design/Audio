# PRD — F-PAIRING: Device pairing

**Status:** stub. **Owning screens (V2, live):** `scanningFragment` → `setUpYourDeviceFragment` → `findDeviceListV2Fragment` → `pairingFragmentV2` → `meetDeviceFragment`. **Detail:** [../../../memory/hardware/protocols.md](../../../memory/hardware/protocols.md).

## Summary
Discover a Noise audio device over BLE, match it against the server catalog, bond, connect via the chip-appropriate transport, and hand off to onboarding/home.

## Declares (acceptance criteria)
- **AC-1 ✓** Scan surfaces nearby devices filtered by Bluetooth-name pattern from the network catalog (`ColorFitNetworkDevice.bluetooth_name_pattern`, `BesScanManager`).
- **AC-2 ✓** Device match uses `matching_type` (`equals`/`contains`/`dropLast`) (`PairDeviceV2ViewModel.matchDevice() :378-390`).
- **AC-3 ✓** Bonding is created if not already `BOND_BONDED` before connect (`BesConnectHandler.kt:310-344`).
- **AC-4 ✓** Headphones (`HW-MBUDS-MAX`) connect via SPP+A2DP/HFP; buds via SPP/BLE service config.
- **AC-5 ✓** Pairing success/failure emit `device_pairing_success` / `device_pairing_failed` with `device_name`.
- **AC-6 ✓** Permission gates (BLE off, location) are enforced before scan (`BleDisabledFragment`, `PermissionRequestFragment`).
- **AC-7 TODO(product)** Behavior when multiple candidate devices match; timeout/retry UX (`ScanTimerState`, `ScanTryAgainFragment`, `DidntFindYoursFragment`).
- **AC-8 TODO** Confirm V1 pairing (`ui/pairing`) is dead and safe to remove (ADR-007).

## Risks
Match & routing branch on device **name/DeviceType** not capability (ADR-002/013).
