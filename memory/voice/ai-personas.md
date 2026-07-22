# AI Assistant Persona(s)

**Blocked by ADR-008.** The canonical AI persona for Noise Audio is **undecided** — `TODO(product/AI)`.

## Evidence
- User-facing name in strings/notifications: **"Noise AI"** (`AudioAiService.kt:146`, `WsTranscribeService.kt:670`, `text_noise_ai_consent_body`).
- **Conflicting leftover**: a hardcoded greeting in `ui/ai/AiChatViewModel.kt:122-123` calls the assistant **"Luna"** and describes it as an *"AI coach … nutritional advice, workout questions … Luna ring"* — copy inherited from a forked Noise fitness app (`build.gradle.kts:95`). Its sender is commented out (dead code) but the string is wrong-brand and wrong-domain.

## What a human must decide (TODO)
- Canonical assistant **name** ("Noise AI" vs a character name).
- **Persona & scope**: it is an *audio-device assistant* (help with earbuds, ANC, transcription, general Q&A) — NOT a fitness/nutrition coach. Purge all Luna/ring/nutrition copy.
- **Tone** per context (see [tone-matrix.md](tone-matrix.md)).
- **Consent/limits messaging** ownership (`NoiseAiConsentBottomSheet`, limit-reached copy).

Until resolved, do not write new AI copy. Behavior detail: [../architecture/ai-integration.md](../architecture/ai-integration.md).
