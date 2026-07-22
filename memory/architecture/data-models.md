# Data Models

Canonical entity shapes as implemented (Gson `@SerializedName` data classes; Room `@Entity`; no kotlinx.serialization). Divergences flagged → ADRs.

## Core entities
| Concept | Model(s) | File |
|---|---|---|
| User | `User` (+ `UserInfo`, `UserGoals`), auth envelope `Data` (User+Token) | `data/model/user/User.kt`, `Data.kt` |
| Device (runtime/paired) | `AudioDevice` (~35 fields: deviceType, sdkType, firmwareCode/Version, colorType, currentMasterBud, is_in_duff) | `common/.../model/AudioDevice.kt:10` |
| Device (network DTO) | `ColorFitNetworkDevice` (+ `DeviceImage`): bluetooth_name_pattern, matching_type, sdk_type | `common/.../model/ColorFitNetworkDevice.kt:9` |
| Device (UI wrapper) | `AllDeviceModel` sealed (Paired/Unpaired) | `data/model/AllDeviceModel.kt:6` |
| Firmware | `FirmwareUpdateData`, `FirmwareVersionResponse` | `data/model/response/FirmwareUpdateData.kt:8` |
| Battery / OTA state | `BatteryData`, `WatchUpdateStatus`, enum `UpdateStatus` | `common/.../model/AudioData.kt` |
| AI / Transcription | `ChatHistoryItem`, `ChatMessagesResponse`, `TranscriptionDetail`, `TranscriptionQuotaResponse`, `SummarizeResponse` | `data/model/ai/*` |
| Warranty | `ValidateSerialNoResponse`, `WarrantyDetailsApiResponse`, `WarrantyRegisterResponse`, `PurchaseChannelResponse` | `data/model/warranty/*` |
| Room entities | `KeyValue` (table `key_value`), `CachedVideo` (table `cached_video`) | `data/local/db/*` |

## Divergent shapes (→ ADRs)
### "Device" — 4 shapes, no shared supertype (ADR-003)
`ColorFitNetworkDevice` (DTO) · `AudioDevice` (runtime/persisted) · `AllDeviceModel` (UI) · `UnsupportedDevice` (`DeviceListResponse.kt:30`). Conversion is manual. **Do not add a 5th — see ADR-003 before touching device models.**

### `DeviceFeatures` — identifier collision (ADR-004)
- `app/.../data/model/DeviceFeatures.kt:5` = **data class** `{ sleep_data: Int }` (the `/device_features` response).
- `common/.../data/local/DeviceFeatures.kt:3` = **capability enum** (BATTERY, ANC, EQ…).
Same name, unrelated concepts.

### API response envelope — 4 variants (ADR-005)
`data/base/BaseApiResponse` · `data/model/base/BaseResponse`+`BaseDataResponse` · `data/model/response/BaseApiResponseImage` · bespoke `FirmwareVersionResponse` (`success/data/message/time`).

## Canonical fixtures
Shared fixtures derived from these shapes: [/data/fixtures/entities/](../../data/fixtures/entities/).
