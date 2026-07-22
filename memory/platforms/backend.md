# Platform Ledger — Backend

**Owned & updated by:** the backend team. **Same-PR rule:** any PR changing an endpoint's contract updates [../architecture/api-contracts.md](../architecture/api-contracts.md) + `parity.json` in the same PR.

> ⚠️ **Partial stub.** Backend source is not in this repo. Everything below is **inferred from the Android client's calls** (`app.gonoise.com` / `stage-app.gonoise.com`). Contracts are the *client's view*; the backend team must confirm and own the authoritative spec.

## What the backend owns (inferred — the source of truth for)
- **Identity/auth:** `auth_v2/*` (OTP, social login, token refresh, logout, account deletion).
- **Device catalog & assets:** `devices/list`, `device_features`, `audio-device-assets`, `device-config` (incl. `custom_eq_config` that drives EQ vs EQ_9), `device/intro`.
- **Firmware:** `firmware-versions` (the authoritative available version per device).
- **AI:** all inference — voice (`wss /audio/ai/v1/voice`), chat SSE (`/audio/ai/v2/stream`, thread management), transcription (`wss /audio/ai/v1/transcribe`, `/transcriptions*`, summarize), quotas & rate limits (429). **No model IDs or prompts live client-side** — the backend chooses the model and assembles prompts.
- **Warranty, Rate & Earn, FAQ, support tickets, app-version gating.**

## To fill (`TODO(backend team)`)
- Per-endpoint request/response schema + error codes (client view in [../architecture/api-contracts.md](../architecture/api-contracts.md)).
- Which LLM/ASR models power the AI features; server-side safety/moderation (client has none — [../architecture/ai-integration.md](../architecture/ai-integration.md), ADR-008 AC-9).
- Whether business rules are duplicated in the native app(s) vs owned server-side ([../architecture/system.md](../architecture/system.md)).
- Confirm response-envelope shape; the client sees 4 divergent envelopes (ADR-005).

## Known contract deviations seen from the client
- `firmware-versions` returns a bespoke envelope (`success/data/message/time`) unlike other endpoints (ADR-005).
- Legacy `moengage_banner` flag in `VersionCheckResponse` with no MoEngage SDK on Android (ADR-014).
