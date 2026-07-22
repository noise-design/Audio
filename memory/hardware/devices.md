# Hardware Devices (HW-*)

**Canonical:** identity → [common/.../DeviceType.kt](../../common/src/main/java/com/noise/audio/common/utils/DeviceType.kt); capability registry → [/src/hardware/devices.json](../../src/hardware/devices.json). If they disagree, code (`DeviceType.kt`) wins for identity. This mirror adds quirks & rationale.

## Catalog
| HW-* | Name | `deviceType` | Form factor | Chip / controller | Personas |
|---|---|---|---|---|---|
| HW-BUDS-1 | Noise Buds 1 | `nile` | TWS in-ear | BES · MasterBuds1Controller | P1, P2 |
| HW-MBUDS-2 | Noise Master Buds 2 | `budspro` | TWS in-ear | BES-SPP · BesSppController | P1, P2, P4 |
| HW-MBUDS-MAX | Master Buds Max | `budsmax` | Over-ear headphones | BES · MaxBudsController | P3, P4, P5 |
| HW-BRIDGEPORT | Noise Bridgeport | `noisebridgeport` | TODO(verify) | BES-SPP · BesSppController | TODO |
| HW-ALT-OWS | ALT Buds Open | `alt_ows` | Open-wear | BES-SPP · BesSppController | P5 |
| HW-ALT-CLIP | ALT Clip | `alt_clip` | Clip-on | TODO(verify) | P5 |
| HW-ALT-BUDS-S | ALT Buds (S) | `alt_buds_s` | TWS in-ear | JL · JLSppController | P1 |
| HW-ALT-BUDS | ALT Buds | `alt_buds` | TWS in-ear | JL · JLSppController | P1 |

Colors (`DeviceColor`, `AudioDevice.kt:73-82`): 1=Black, 2=Silver, 3=Titanium. HW-MBUDS-2 color codes: `0x01` Silver / `0x02` Black / `0x03` Golden (`AudioSDK.kt:19-25`).

## Three chip families → three controllers
- **MasterBuds1** (`nile`) → `MasterBuds1Controller`.
- **BES-SPP** (`budspro`, `noisebridgeport`, `alt_ows`) → `BesSppController` + `BesProtocolDecoder`.
- **Max** (`budsmax`, headphones) → `MaxBudsController` (SPP + A2DP/HFP).
- **JL / Jieli** (`alt_buds`, `alt_buds_s`) → `JLSppController`.
Routing is by `DeviceType` in the `bes` handlers (`BesQueryDeviceUnitsHandler.kt:59-99`, `BesUpdateDeviceUnitsHandler.kt:77-130`). The `sdk_type` field that *should* drive this is unused (ADR-013).

## Firmware quirks & workarounds (evidence)
- **JL empty pre-OTA command** — `BesUpdateDeviceUnitsHandler.kt:90-94`: `JL_PRE_OTA_COMMAND_HEX = ""`. Comment: JL chip ignores raw RCSP OTA frames until an app-level prep command runs; empty string ⇒ "OTA handshake fails silently". → **ADR-016**.
- **JL auth flag** — `:96-100`: `JL_USE_AUTH_DEVICE = true` must match firmware config or "error 4114 / SUB_ERR_REMOTE_NOT_CONNECTED".
- **JL connect no-ops** — `bes/.../ota/JLSppOtaManager.kt:120-132`: `connectBluetoothDevice()`/`disconnectBluetoothDevice()` deliberately no-op; firing CONNECTION_OK twice triggers SDK error 4114 ("cannot pass identical device state twice"). Auth wait `AUTH_TIMEOUT_MS=10000`.
- **BLE write-slot recovery** — `besSdk/.../connect/BleConnector.kt:624-645`: `awaitWriteSlot()` force-releases the GATT write slot on timeout so a lost `onCharacteristicWrite` (link loss) can't permanently stall the writer. (Matches the "ble gatt channel lock" commit.)
- **MB2 TODOs** — `AudioSDK.kt:339,396,496` three `//todo change` markers on MASTER_BUDS_2 branches.
- **DFU/duff mode** — `AudioDevice.kt:16` `is_in_duff`; propagated during scan/pair.

## Adding a device
Follow [/templates/new-device.md](../../templates/new-device.md). Today this requires editing `DeviceType.kt` **plus ~25 `when(DeviceType)`/`||` sites** (ADR-002) — the checklist enumerates them. The target state is: add one `HW-*` row + capability set here, no branching edits.
