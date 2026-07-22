# State Management

## Pattern
MVVM + Repository, Hilt DI, coroutines/Flow. **No UseCase layer.**
- **ViewModels (61)** extend `BaseViewModel` (`ui/base/BaseViewModel.kt:9`) exposing `LiveData<Event<…>>` (`_message`, `_loading`, `_apiError`). `@HiltViewModel @Inject constructor`.
- **Repositories (6)**: `AppRepository`, `AuthenticationRepository`, `DeviceRepository`, `DownloadRepository`, `MultiConnectionRepository`, `UserRepository` — interface/impl split. Return `Flow<Resource<BaseApiResponse<T>>>`.
- **`Resource` sealed type**: `Loading / Success / GenericError / NetworkError`. VMs collect in `viewModelScope.launch(Dispatchers.IO)` and branch.

## UI state holders
- **LiveData dominant (56 files)** — private `MutableLiveData` + public `LiveData`, one-shot events wrapped in `Event<T>`.
- **`StateFlow` (newer, 6 files)** — consolidated `uiState: StateFlow<UiState>` in `FaqViewModel`, `AppLanguageViewModel`; the WS transcription feature is fully StateFlow (`WsTranscribeViewModel`: serviceState/transcript/partial/amplitude/errors/rateLimit/quota). Closest thing to MVI.
- **Compose state (marginal, 3 files)** — `mutableStateOf`/`collectAsState` via `BaseComposeFragment`.
- **`EventBus` (greenrobot)** also used for some cross-component events — a third event mechanism alongside LiveData/Flow (inconsistency to note).

## App-wide state hub
`@Singleton SessionManager` (`session/SessionManager.kt`) holds live device/connection state as LiveData: `connectState` (:132), `connectedDevice` (:87-88), `firmwareStateDisplay` (:81-82), plus `Event<>` triggers (`startAudioAi`, `forceDisconnect`, `deviceSwitching`, `forceOtaFlowRunning`…). Injected into ViewModels. This is the central source for "is a device connected and what is it".

## Convention for new work
- New screens: `StateFlow<UiState>` (align with the newer pattern) over scattered LiveData.
- Keep device/connection reads going through `SessionManager`, not ad-hoc.
- Prefer Flow over EventBus for new cross-component signals.
