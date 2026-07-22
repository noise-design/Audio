# Template / Checklist: New Device Model

Rule file: [/.claude/rules/hardware.md](../.claude/rules/hardware.md). Canonical: [/src/hardware/devices.json](../src/hardware/devices.json).

## Target state (goal)
Adding a device should be: **1 entry in `devices.json` + 1 capability set in `feature-map.json`** — no code branching. Get there via ADR-002.

## Register (always)
1. Mint `HW-<MODEL>`; add to [/src/hardware/devices.json](../src/hardware/devices.json) (deviceType string, form factor, chip family/controller, connection, batteryReporting, targetPersonas, capabilities).
2. Add per-feature support rows to [/src/hardware/feature-map.json](../src/hardware/feature-map.json).
3. Mirror quirks in [/memory/hardware/devices.md](../memory/hardware/devices.md); update the grid [/memory/hardware/feature-matrix.md](../memory/hardware/feature-matrix.md).
4. Add a fixture to [/data/fixtures/entities/devices.json](../data/fixtures/entities/devices.json) (one per firmware-relevant variant).

## Code today (until ADR-002 resolved — the debt to avoid growing)
Adding a model currently forces edits across ~25 files. Enumerate before you start:
- [ ] `common/.../utils/DeviceType.kt` — enum entry (name + deviceType string) + `findDeviceType`.
- [ ] `audio/AudioSDK.kt` — dashboard/sound/control feature resolvers, image/color maps, `hasWearDetection`, `showSpatialInfo`, `isMax` (~104 branch sites).
- [ ] `bes/.../BesQueryDeviceUnitsHandler.kt` + `BesUpdateDeviceUnitsHandler.kt` — controller routing maps + `when`.
- [ ] `bes/.../BesConnectHandler.kt` — `getServiceConfig()` UUIDs/protocol/TOTA + bonding path.
- [ ] chip controller (`MasterBuds1Controller` / `BesSppController` / `MaxBudsController` / `JLSppController`) + OTA manager.
- [ ] `EqualizerMaxViewModel.kt`, `TouchGesturesViewModelV2.kt`, `HomeCardSelector.kt`, pairing match (`PairDeviceV2ViewModel.matchDevice`), product guide.
- [ ] colors.xml colorway group if a new finish.
- [ ] **Do NOT** put the `HW-` id in code (rule gate).

## Checklist
- [ ] `devices.json` + `feature-map.json` updated. [ ] fixture added. [ ] parity updated if it changes a feature. [ ] OTA path verified (JL? see ADR-016). [ ] `HW-` gate still 0.
