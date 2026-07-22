# Connectivity, Sync & Offline

Shared spec for network + device connectivity. Platform-specific quirks go to the platform ledgers, not here.

## Network connectivity
- `NetworkConnectionInterceptor` (`NetworkModule.kt:98`) checks connectivity and drives token refresh on every call.
- `Resource.NetworkError` surfaces no-connectivity to the UI; strings `text_no_internet_connection`.
- AI features guard network before connecting (voice: `AudioAiViewModel.kt:89-92`).
- Token refresh uses a **separate OkHttp client** (`@Named("TokenClient")`) to avoid interceptor recursion; `TokenRefreshApi` with `refresh-token`/`wearable-type`/`user-agent` headers.

## Device connectivity (BLE/SPP/A2DP)
- Central live state in `SessionManager.connectState` / `connectedDevice` ([state-management.md](state-management.md)).
- Reconnect/recovery: `AudioConnectionManager` force-reconnect timer + `checkValidateConnection()`.
- WebSocket keep-alive: cloud transcription pings every 5 s to detect dead sockets (`WsTranscribeService.kt:206-208`).
- Full lifecycle + error taxonomy: [../hardware/protocols.md](../hardware/protocols.md).

## Local cache / offline
- **Room** `noisefit-audio-db` v2 (`KeyValue`, `CachedVideo`) — key-value store + cached video (walkthrough/setup media offline).
- **SharedPreferences** ×2: `DataStored*` (app, Gson-backed) + `noise_fit_Audio` (common; OTA timestamps, watch data). Plus `MyPreferences`, `AudioAiClient` direct prefs.
- **No Jetpack DataStore** despite "DataStore"-named classes (naming trap).
- `ILastSyncStore` tracks last-sync timestamps.

## Sync model
- No offline-first sync framework; data is fetched on demand via repositories and cached opportunistically (Room/prefs). Device state is live (not persisted across sessions except identity/last-connected).
- `TODO(arch)`: document sync/refresh cadence per data type (device list, firmware check, AI history) — not centrally specified.

## Cross-platform note
Any offline/sync divergence between Android and iOS → open an ADR; per-platform quirks stay in [../platforms/](../platforms/).
