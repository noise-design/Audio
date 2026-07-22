# Flows (state machines, as implemented)

State machines per flow. Because this is a hardware companion app, **hardware states are mandatory** on any device-dependent screen, on top of the generic loading/empty/error. Cross-ref [../hardware/protocols.md](../hardware/protocols.md), screens [screens.md](screens.md).

## Generic states (every screen)
`loading` · `content` · `empty` · `error(retryable?)`.

## Mandatory hardware states (device-dependent screens)
From `ConnectState` (`common/.../ConnectionCallbacks.kt`):
`connected` · `connecting/pairing` · `disconnected` · `reconnecting/recovering` (`AudioConnectionManager` force-reconnect) · `dfu/ota-mode` (`DfuMode`) · `unpaired`.
Battery sub-states (Home): `normal` · `below20` · `below10` · `charging` · `unknown(-1)`.

## Connection flow
`Start → Connecting → (ConnectSuccess → onDeviceReady | ConnectFailed → retry/help)`; bonding sub-flow (BONDING→BONDED→connect | NONE→failed); reconnect timer on drop; `DfuMode` diverts to firmware flow. See protocols.md.

## Pairing flow (V2)
`scanning → found(list) | not-found(retry/help) | ble-off | no-permission` → `select → connecting → success(meet-device) | failed(try-again)`. Guards: `BleDisabledFragment`, `PermissionRequestFragment`.

## Firmware/OTA flow
`check → up-to-date | update-available → precheck(battery/connection) → OTAStatus[STARTED→UPDATING→VERIFYING→VERIFIED→REBOOT→SUCCEED] | FAILED/VERIFIED_FAILED → retry`. Force-OTA variant armed at splash. JL-chip path has quirk states (ADR-016).

## AI voice flow
`idle → (no-network guard) → connecting(wss) → listening ⇄ speaking (VAD/barge-in) → idle-timeout(30s auto-stop) | limit(429) | error → stopped`.

## AI chat flow
`empty → sending → streaming(tokens) → done | error(retry) | 406(clock retry) | 429(limit dialog)`.

## Transcription flow
`idle → recording(cloud-ws | on-device SpeechRecognizer, fallback-to-cloud on lang error) → partial/final → stop → summarizing → detail`; quota states `green → yellow → red(depleted)`; `rate-limit(429)`.

## Gaps
- Not every screen implements all mandatory hardware states today — audit needed (TODO). No standardized empty/error component (see [components.md](components.md)).
