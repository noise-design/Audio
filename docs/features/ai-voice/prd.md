# PRD — F-AI-VOICE: Noise AI voice assistant

**Status:** stub. **Owning screens:** `activateAiOnDeviceFragment` → `audioAiCalibrationFragment` → `audioAiFragment`. **Detail:** [../../../memory/architecture/ai-integration.md](../../../memory/architecture/ai-integration.md). **Blocked by:** ADR-008 (Luna persona leftover).

## Summary
Bidirectional streaming voice assistant. Mic audio (PCM16 mono 24 kHz, 20 ms frames) streams to the backend over WebSocket; response PCM is played back, with VAD + barge-in/duck.

## Declares (acceptance criteria)
- **AC-1 ✓** Voice connects to `wss://<host>/audio/ai/v1/voice` with per-user `access-token` / `guest-id` auth (`AudioAiClient.kt:165-181,503-537`).
- **AC-2 ✓** Client streams raw PCM frames; no text prompt or system prompt is assembled client-side (`AudioAiClient.kt:698-704`).
- **AC-3 ✓** Session auto-stops after 30 s idle (`globalIdleTimeoutMs = 30_000L`).
- **AC-4 ✓** No-network is guarded before connect (`AudioAiViewModel.kt:89-92`, `text_no_internet_connection`).
- **AC-5 ✓** On 429 / failure / audio-focus loss, session stops and a limit/error is surfaced.
- **AC-6 ✓** Tap-to-speak emits `ai_voice_chat_taptospeak_click`.
- **AC-7 TODO(product/AI)** Assistant persona/name for Noise Audio (resolve ADR-008; today a "Luna" greeting exists in dead code).
- **AC-8 TODO(product)** VAD tuning targets, barge-in behavior spec, and which `HW-*` expose on-device AI activation.

## Notes
No on-device LLM; all inference is server-side (`*.gonoise.com`). No client-side safety filter (AC-9 TODO: confirm server moderation).
