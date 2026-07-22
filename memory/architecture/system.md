# System Topology

How responsibility is split across the backend, the native app, and the device. Sources cited inline.

## Layers
```
Device (BES/JL chip)  ──BLE/SPP/A2DP──►  Android app (com.noise.audio)  ──HTTPS/WSS──►  Backend (*.gonoise.com)
   firmware, sensors,                        UI, connectivity, local cache,                 identity, catalog, firmware
   ANC/EQ/battery/touch                       device orchestration                          registry, AI inference, warranty
```

## Backend owns (source of truth — inferred from client calls)
- Identity/auth, tokens (`auth_v2/*`).
- **Device catalog** (BT-name patterns, `sdk_type`, assets) and **device-config** (incl. `custom_eq_config` that drives EQ vs EQ_9).
- **Firmware registry** (authoritative available version).
- **All AI inference** — model choice, prompt assembly, moderation, quotas (client has none; [ai-integration.md](ai-integration.md)).
- Warranty, rewards, FAQ, support, app-version gating.
Detail + ownership questions: [../platforms/backend.md](../platforms/backend.md).

## Android app owns
- All UI/navigation (Fragments/XML + marginal Compose).
- **Device connectivity & orchestration** — the `bes`/`besSdk` layers translate app intents to chip protocols; `SessionManager` holds live device/connection state.
- Local cache: Room (`noisefit-audio-db`) + SharedPreferences (see [state-management.md](state-management.md)).
- Capability decisions — **currently by `DeviceType` model-branching** (ADR-002), which *should* be catalog-driven capability flags (a business-rule leak into the client).

## Device owns
Firmware, real-time audio processing (ANC/EQ/spatial applied on-chip), battery, touch/motion sensing. App sends commands via `QueryAction`/update handlers.

## Business-logic duplication?
- **Single native platform in this repo** (Android). iOS is a separate repo (unknown) — if iOS reimplements the same capability-gating logic (`AudioSDK.kt` model-branching), that logic is duplicated across native apps and diverges. → tracked as risk under ADR-002; **iOS team to confirm** in [../platforms/ios.md](../platforms/ios.md).
- Capability gating that arguably belongs server-side (per-device feature sets) lives in the Android client (ADR-002/013) — a duplication/leak to flag.

## Module topology (Gradle)
`:app` (UI + orchestration) → depends on `:common` (shared models/interfaces), `:bes` (handlers + OTA) → `:besSdk` (chip SDK). DI via Hilt across all. See [../platforms/android.md](../platforms/android.md).
