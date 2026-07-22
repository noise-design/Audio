# Scope Ledger

> ⚠️ **Stub.** Tracks what is in-scope, out-of-scope, and parked. No scope doc exists in-repo; seed rows below are inferred from code. `TODO(product)` to confirm and maintain.

## In scope (shipping — evidence in code)
Device pairing, Home dashboard, ANC/transparency, EQ, sound controls (spatial/sidetone/gaming/bass/audio-boost), touch & motion controls, dual pairing, firmware OTA, find-my-device, product guides, warranty, rate & earn, profile/account, app language (17 locales), Noise AI (voice/chat/transcription). Full list: [/docs/index.md](../../docs/index.md).

## Out of scope (inferred — confirm)
- **Fitness/health tracking** — heritage code only (NoiseFit/Luna), no shipping feature. `TODO(product)`: confirm audio-only.
- iOS/backend implementation — separate repos.

## Parked / dead code (see ADRs)
- Legacy V1 flows (login/pairing/profile/settings) — ADR-007.
- Dead analytics path `UIController.logAppEvent` — ADR-014.
- `NetworkConstants.BASE_URL`, `sdk_type` routing — ADR-018, ADR-013.

## Decision log
`TODO(product)`: record scope changes here with date + ADR link.
