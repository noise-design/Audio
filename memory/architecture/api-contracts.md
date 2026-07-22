# API Contracts (as implemented — client view)

Client-side view of every endpoint the Android app calls. **Backend owns the authoritative spec** ([../platforms/backend.md](../platforms/backend.md)). Base URL = `BuildConfig.BASE_URL` (`live`=`https://app.gonoise.com`, `staging`=`https://stage-app.gonoise.com`). Definitions: `data/service/APIService.kt`, dynamic `@Url` built in `AppRepositoryImpl.kt`; token refresh `data/remote/TokenRefreshApi.kt`; downloads `data/service/DownloadService.kt`. Interceptor: `NetworkConnectionInterceptor` (token refresh + connectivity); DEBUG-only HTTP + curl logging.

## APIService — fixed paths
| Method | Path | fn (file:line APIService.kt) |
|---|---|---|
| POST | /user_detail/audio/faq | getFaqs :52 |
| POST | /core/audio/app-version | checkAppVersion :55 |
| POST | /core/audio/firmware-versions | checkFirmwareUpdatedVersion :58 |
| GET | /user_detail/audio/rate_and_earn/status | getRateEarnData :61 |
| POST | /rewards/rae/claim | getRateEarnClaim :64 |
| POST | /auth_v2/audio/send-otp | sendOtp :67 |
| POST | /auth_v2/audio/verify-otp | verifyOtp :70 |
| POST | /auth_v2/audio/login | handleSocialLogin :73 |
| POST | /users/v3/international/create | createInternationalUser :76 |
| POST | /user_detail/audio/profile/update | updateUserProfile :79 |
| GET | /user_detail/audio/devices/list | getDeviceList :82 |
| GET | /user_detail/audio/device_features | getDeviceFeatures :85 |
| GET | /user_detail/audio-device-assets | getAudioDeviceAssets :90 |
| GET | /user_detail/audio-device-assets/min | getGenericAudioDeviceAssets :96 |
| POST | /user_detail/audio/devices | setUserDevice :99 |
| POST | /user_detail/audio/v1/device-config | getDeviceConfig :102 |
| POST (Multipart) | /user_detail/audio/rate_and_earn/upload | uploadRateEarnCaptureImage :107 |
| POST | /user_detail/audio/guest/devices | createGuestUser :112 |
| POST (Multipart) | /user_detail/upload/profile-image | uploadUserImage :116 |
| POST | /auth_v2/logout | logoutUser :121 |
| POST | /user_detail/disable/account | deleteUser :124 |

## APIService — dynamic @Url (built with BASE_URL_NEW, mostly in AppRepositoryImpl.kt)
| Method | Resolved path | fn :line |
|---|---|---|
| GET | /audio/ai/v2/new-chat | generateThreadId :127 |
| GET | /audio/ai/v1/suggested-questions | getAiTopQuestions :132 |
| GET | /audio/ai/v2/chat-history | getChatHistory :138 |
| GET | /audio/ai/v2/transcriptions | getTranscriptions :143 |
| GET | /audio/ai/v2/transcriptions/{id} | getTranscriptionDetail :148 |
| GET | /audio/ai/v2/transcription-quota | getTranscriptionQuota :153 |
| DELETE (hasBody) | /audio/ai/v2/delete | deleteTranscriptions :158 |
| POST | /audio/ai/v2/transcriptions/summarize/{id} | summarizeTranscription :164 |
| PATCH | /audio/ai/v2/transcriptions/{id} | updateTranscription :169 |
| DELETE | (thread_id query) | deleteChatHistory :175 |
| GET | /audio/ai/v2/chat | loadMessagesByThreadId :181 |
| GET | /audio/ai/v2/stopStream | stopResponseGeneration :188 |
| GET | /user_detail/audio/how-to-wear | getHowToWearData :193 |
| POST | (chat url) | getChatUrl :198 |
| POST | /user_detail/audio/device/intro | getDeviceIntro :203 |
| GET | (ai message limit) | getAiMessageLimit :209 |
| GET | (purchase channels) | getPurchaseChannels :214 |
| POST | (validate serial) | validateSerialNo :219 |
| POST (Multipart) | (warranty register) | registerWarranty :225 |
| POST | (warranty details) | getWarrantyDetails :238 |
| POST (Multipart) | (support ticket) | submitSupportTicket :244 |

## WebSocket (AI) — not Retrofit
- `wss://<host>/audio/ai/v1/voice` (`AudioAiClient.kt:165-181`)
- `wss://<host>/audio/ai/v1/transcribe` (`WsTranscribeService.kt:191-200`)
- SSE stream: `GET /audio/ai/v2/stream?message=&thread_id=` (`AiChatViewModel.kt:333-337`)

## Auxiliary
- `TokenRefreshApi` — `GET @Url refreshAccessToken` (headers refresh-token/wearable-type/user-agent) → `Token`; own OkHttp client to avoid interceptor recursion.
- `DownloadService` — `@Streaming @GET @Url` (placeholder base `http://localhost/`, absolute `@Url` per call).

## Consumption status
- **Consumed-but-contract-divergent:** `firmware-versions` returns a bespoke envelope (ADR-005).
- **Backend-implemented-but-unconsumed / dead:** none confirmed — spot-checked orphan candidates (`getChatUrl`, `getGenericAudioDeviceAssets`, `createGuestUser`, `getRateEarnClaim`, `getAiMessageLimit`, `getPurchaseChannels`, `getDeviceConfig`, `deleteChatHistory`) all have callers.
- **Error codes handled by client:** 429 (rate limit → limit dialog), 406 (`WRONG_CLIENT_TIME_ERROR`). Others via generic `Resource.GenericError/NetworkError`.
- **`NetworkConstants.BASE_URL` const is dead** (BuildConfig wins) — ADR-018.
