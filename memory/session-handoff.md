# Session Handoff — MANDATORY FIRST READ

**Last updated:** 2026-07-22 (android memory merge).

## Current state
Audio is the master project. Three merges are complete:
1. **2026-07-20 — Design system (Figma DLS):** 26 components (canonical metadata + graph) from legacy `Noise-Audio`; 16 coded components from legacy `noiseAudio` in src/components/code/; tokens + rulebook in place. Legacy folders untouched.
2. **2026-07-20 — i18n system:** src/i18n canonical, 837 en keys, de/hi worklists in MISSING-KEYS.md.
3. **2026-07-22 — Android codebase knowledge (v4.7.3):** hardware catalog (8 devices, 19 capability flags), ~171 analytics events, ~40 API endpoints, ~106 screens / 30 feature areas, architecture + AI integration docs, quality bar, 18 code-mined ADRs. See memory/changelog.md.

## Highest-leverage next actions
1. Resolve ADR-023 (Figma DLS tokens vs android shipping tokens) and ADR-024 (new i18n schema vs android strings.xml) — these decide the app's convergence path onto the new design/i18n systems.
2. Code the 10 metadata-only DLS components: action-card, action-sheet, card-heading, description, image-asset-placeholder, modal-card, modal-sheet, privacy-policy-tab, progress-bar, text-field.
3. Work the code-mined ADRs (memory/decisions.md ADR-001..018) — top: keystore secrets in build script (ADR-001), capability gating by model-branching (ADR-002), dynamicColor overriding brand (ADR-006).
4. Consolidate duplicate templates (ADR-025).
5. Designer to supply CONTROL_PANEL.md (flagged since Figma ingestion).
6. Visual pass on the 16 coded components against Jul 10 token values.
7. Translate remaining de (35) / hi keys — MISSING-KEYS.md.
8. Fill product stubs (vision, scope-ledger, tone-matrix cells) — owner table below.
9. Consider git init + first commit of Audio.

## Stubbed — needs a human owner
| File | Owner | Question to answer |
|---|---|---|
| [product/vision.md](product/vision.md) | Product | What is the product's mission, positioning, non-goals? |
| [product/personas.md](product/personas.md) + [/src/personas/personas.json](../src/personas/personas.json) | Product/UXR | Real persona demographics, goals, device mix (only *segment signals* are inferred from features) |
| [product/scope-ledger.md](product/scope-ledger.md) | Product | What is explicitly out of scope / parked? |
| [voice/tone-matrix.md](voice/tone-matrix.md) | Content/Brand | Tone per persona × context (grid exists, cells TODO) |
| [voice/ai-personas.md](voice/ai-personas.md) | Product/AI | Canonical AI assistant name & persona (blocked by ADR-008 Luna leftover) |
| [platforms/ios.md](platforms/ios.md) | iOS team | iOS conventions/gaps (separate repo) |
| [platforms/backend.md](platforms/backend.md) | Backend team | Ownership of business rules, per-endpoint contracts (separate repo) |
| [analytics/monetization-map.md](analytics/monetization-map.md) | Growth/Product | Monetization surfaces, arming triggers, eligible personas |
| [product/journeys.md](product/journeys.md) | Product | Confirm/annotate journeys **reconstructed from nav order** |

## Open conflicts
All in [decisions.md](decisions.md): ADR-001..018 (code-mined), ADR-023..025 (merge conflicts, OPEN).
