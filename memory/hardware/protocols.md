# Connection & OTA Protocols (as implemented)

**Canonical:** the code. This documents the pairing/connection lifecycle, states, and error taxonomy as they exist. Sources cited inline.

## Transports
- **BLE / GATT** — `besSdk/.../connect/BleConnector.kt` (default MTU 512, `BesSdkConstants.kt:6`). Encrypted TOTA channel (AES/SHA256: `besSdk/.../utils/sha/`).
- **SPP** (Bluetooth Classic) — `besSdk/.../connect/SppConnector.kt`.
- **A2DP + HFP** (headphones) — profile-proxy connect via reflection for `HW-MBUDS-MAX` (`BesConnectHandler.kt:80-127`).
- Protocol chosen per model in `getServiceConfig()` (`BesConnectHandler.kt:348-478`); `DeviceProtocol` enum = `PROTOCOL_SPP | PROTOCOL_BLE`.
- **LE upgrade**: on success, if `hmDevice.isLEConnectionSupported`, swap to the BLE address (`BesConnectHandler.kt:259-263`).

## App-facing connection state machine
`common/.../interfaces/connection/ConnectionCallbacks.kt` — `sealed class ConnectState`:
`Start` → `Connecting` → `ConnectSuccess` / `ConnectFailed`; `DisconnectSuccess` / `DisconnectFailed`; `DfuMode(version, needForceOTA)`; `UnPaired`; `ReconnectStatus(audioBindState)`.
- `BindState`: BindSuccess/Failure, UnbindSuccess/Failure.
- `AudioBindState`: InvalidToken / WatchIsUnbind / AlreadyPaired.
- `ConnectionEventsConstants`: disconnect_success / success / connecting / failed / disconnected / timeout / retry.

Central state hub: `SessionManager` exposes `connectState`, `connectedDevice`, `firmwareStateDisplay` as LiveData (see [../architecture/state-management.md](../architecture/state-management.md)).

## SDK-level status
- `BesServiceListener.ConnectionStatus`: Connecting, Start, ConnectionSuccess, ConnectionFailed, Disconnected, Paused, NeedPermission, Success.
- `BesConnectState` (`BesSdkConstants.kt:106-112`): BES_CONFIG_ERROR, BES_NO_CONNECT, BES_CONNECT_NOTOTA, BES_CONNECT_TOTA, BES_CONNECT.

## Pairing / connect flow (as implemented)
1. Scan — `BesScanManager` + `BtPermission` (filters by BT-name pattern from the network catalog).
2. Select — `matchDevice()` compares BT name (`equals`/`contains`/`dropLast`) by `matching_type` (`PairDeviceV2ViewModel.kt:378-390`). ⚠️ name-string branching (ADR-002).
3. Bond — `createBond()` if not `BOND_BONDED` (`BesConnectHandler.kt:310-344`); bond receiver handles BONDING/BONDED/NONE.
4. Connect — MAX → `connectHeadPhones()` (SPP/A2DP/HFP); others → `connectServiceConfig()` with per-model UUIDs + TOTA flags.
5. Ready — `onDeviceReady`; queries battery/EQ/ANC/etc via `QueryAction`.

Reconnect/recovery: `AudioConnectionManager` — `startForceConnectionTimer()` (`:398-408`), `forceReconnectTask`→`checkValidateConnection()` (`:415-422`).

## Mandatory UI states for hardware flows
Any screen that depends on the device MUST handle: **disconnected**, **connecting/pairing**, **reconnecting/recovering**, **DFU/OTA mode**, plus the generic loading/empty/error. See [../design/flows.md](../design/flows.md).

## Error taxonomy
- `StatusCode` (`besSdk/.../utils/StatusCode.kt`): UNKNOWN(-1), SUCCESS(0), TIMEOUT(1), CANCEL(2), FAIL(3).
- `BesSdkConstants.kt:52-73`: BES_CONNECT_SUCCESS `0x29a`, BES_CONNECT_ERROR `0x1bc`, NOTIFY_SUCCESS/ERROR, TOTA_START/CONFIRM/SUCCESS/ERROR, MSG_TIME_OUT `0x404`, MSG_PARAMETER_ERROR `0x405`.
- JL: `4114 / SUB_ERR_REMOTE_NOT_CONNECTED` (see OTA quirks below).

## OTA / firmware
- `OTAStatus` (`besSdk/.../utils/OTAStatus.kt`): STARTED, UPDATING, PAUSED, CANCELED, VERIFYING, VERIFIED, FAILED, SUCCEED, REBOOT, VERIFIED_FAILED. (Description typo "Verifyed" at `:10`.)
- OTA managers: BES/Max via `BesUpdateDeviceUnitsHandler` + `BesOtaCMD`; JL via `JLSppOtaManager`; ALT-OWS via `AltOwsOtaManager`.
- Force-OTA: `SessionManager.forceOtaFlowRunning/forceOtaResponse`, armed at Splash (`SplashViewModel.kt:140-144`).
- Update-cadence logic: `FirmwareUpdateViewModel.shouldShowSoftUpdate()` (24/48/72h remind), `checkPassBeforeFirmwareStart()` (battery/connection gate).
- **Quirks → ADR-016** (JL empty pre-OTA cmd, auth flag, no-op connect, error 4114). Full detail in [devices.md](devices.md).
