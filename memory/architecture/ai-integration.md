# AI Integration (fully evidence-based)

This app is a **client of a remote AI backend** (`*.gonoise.com`), not an AI implementation. No on-device LLM, no model IDs, no client-side prompt assembly, no client-side safety filter. All facts cited to `file:line`.

## Features (4)
1. **Voice assistant ("Noise AI")** — bidirectional streaming. Mic PCM16 mono 24 kHz / 20 ms frames over WebSocket; response PCM played back; energy VAD + barge-in/duck. `ai/AudioAiClient.kt:43-47`, driven by `ui/ai/audio/AudioAiViewModel.kt:88-168`.
2. **Text chatbot** — SSE token streaming, server-managed threads. `ui/ai/AiChatViewModel.kt:309-455` (`askQuestionStream`).
3. **Live transcription** — cloud WebSocket ASR (`service/WsTranscribeService.kt:63-70`) OR on-device Android `SpeechRecognizer` (`service/TranscriptionService.kt:147-190`).
4. **Summarization** — `AppRepositoryImpl.kt:136-141` → `POST /audio/ai/v2/transcriptions/summarize/{id}`.

`ActivateAiOnDeviceViewModel` ("on-device AI") is **not** an on-device model — it loads a promo video + device assets (`:33-55`).

## Models
**No model IDs anywhere in the client** (grep for gpt/whisper/vosk/claude/gemini/tflite = 0). All LLM/ASR inference is server-side. OpenAI-style response model `data/model/ai/ChatAudioModel.kt` exists but is **imported unused** in the voice path (raw PCM is read instead). On-device transcription uses Android `SpeechRecognizer.createOnDeviceSpeechRecognizer` (`TranscriptionService.kt:167`). `ChatGpt*` naming hints at a GPT backend but the model is chosen server-side.

## Prompt assembly
**None client-side.** Text chat sends only the URL-encoded user message + `thread_id` as query params (`AiChatViewModel.kt:333-337`); the server manages history. Voice sends only raw PCM frames (`AudioAiClient.kt:698-704`). A hardcoded **"Luna" greeting** exists (`AiChatViewModel.kt:122-123`) but its sender `sendInitMessage()` is commented out — display-only dead code, and wrong-brand/wrong-domain (fitness ring). → **ADR-008**. Responses are post-processed to strip citation markers (`sourcePattern` `AiChatViewModel.kt:103`).

## Context budget
No client token limits. Chat history capped at 1000 messages (`AiChatViewModel.kt:642`). Voice global idle timeout 30 s (`AudioAiClient.kt:112`), playback-inactivity 1 s. Transcription quota is **time-based (seconds)**, not tokens (`data/ai/TranscriptionQuotaManager.kt:30-57`; thresholds `ui/ai/TranscriptionTimerThreshold.kt`, unit-tested). VAD windows: start 220 ms / end 700 ms / hangover 300 ms (`AudioAiClient.kt:108-110`).

## Fallback
- Chat: 429→limit dialog; 406→`WRONG_CLIENT_TIME_ERROR` retry; other→`text_ai_error_message`; `retryApi()` (`AiChatViewModel.kt:356-451`).
- Voice: onFailure/onClosing/onClosed→`stop()`; 429/audio-focus-loss/idle-timeout→stop + local notice (`AudioAiClient.kt:363-467`).
- Cloud transcribe: 5 s ping heartbeat; 429→rate-limit+stop; socket errors→"Connection failed" (`WsTranscribeService.kt:206-360`).
- On-device transcribe: LANGUAGE_NOT_SUPPORTED/UNAVAILABLE (12/13)→download pack + `fallbackToCloud()`; per-error backoff; gives up after 8 consecutive errors (`TranscriptionService.kt:291-312`).
- Voice no-network guard before connect (`AudioAiViewModel.kt:89-92`).

## Safety
**No client-side moderation/blocklist/filter** (grep = 0). Only a **consent** string `text_noise_ai_consent_body` (`strings.xml:996`), surfaced by `ui/ai/NoiseAiConsentBottomSheet.kt`. Any moderation is server-side (backend team to confirm — [../platforms/backend.md](../platforms/backend.md), ADR-008 AC-9).

## Config / endpoints (no secrets)
- Base: `BuildConfig.BASE_URL`/`BASE_URL_NEW` (`app/build.gradle.kts:94-102`).
- Voice WS: `wss://<host>/audio/ai/v1/voice` (`AudioAiClient.kt:165-181`).
- Cloud transcribe WS: `wss://<host>/audio/ai/v1/transcribe` (`WsTranscribeService.kt:191-200`, hardcoded stage fallback `:193`).
- REST/SSE: `/audio/ai/v2/{new-chat,stream,chat,chat-history,transcriptions*,stopStream}`, `/audio/ai/v1/{suggested-questions,user/message/limit}` (`AppRepositoryImpl.kt`).
- Auth: per-user `access-token: Bearer …` or `guest-id` header. **No LLM/provider API keys in the client.**

## Persona → [../voice/ai-personas.md](../voice/ai-personas.md) (blocked by ADR-008).
