# CLAUDE.md — Entry Point (routes, never contains)

**Product (one-liner):** Android companion app for Noise wireless audio devices (TWS earbuds, open-wear buds, clip buds, over-ear headphones) built on Bestechnic/JL chip SDKs — pairing, battery, ANC, EQ, touch controls, firmware OTA, and a server-backed "Noise AI" voice/chat/transcription assistant. Package `com.noise.audio`, v4.7.3. Vision/positioning: `TODO(product)` — memory/product/vision.md.

## Non-negotiable rules
1. Read `memory/session-handoff.md` FIRST in every session.
2. One canonical home per fact. Machine-readable files in `src/` win over markdown mirrors; every mirror names its canonical at the top.
3. Cross-reference by stable IDs only (P#, J-<FLOW>-##, F-*, HW-*, S-*, ADR-###, event registry keys, i18n keys) — never by prose.
4. No hardcoded values that bypass a token/registry: colors→tokens, copy→i18n keys, motion→motion tokens, events→event registry, device capability→`DeviceFeatures` flags (never model-name branching).
5. Every new event, persona, feature, device, or motion pattern starts from a file in `templates/`.
6. Flag conflicts in `memory/decisions.md` as an `ADR-###` with status OPEN; never silently pick a winner.
7. Same-PR parity rule: a PR touching feature `F-X` on any platform updates `src/platforms/parity.json` in the same PR.
8. Update `memory/changelog.md` and `memory/session-handoff.md` at the end of every session.

## Where to find things
| Question | File |
|---|---|
| What is the current state / what's next? | memory/session-handoff.md |
| Master map of all knowledge | memory/index.md |
| Open conflicts / decisions (ADR log) | memory/decisions.md |
| What changed, when? | memory/changelog.md |
| Who are the users? | memory/product/personas.md (canonical: src/personas/personas.json) |
| User journeys & step IDs | memory/product/journeys.md |
| What's out of scope? | memory/product/scope-ledger.md |
| Device catalog & capabilities | src/hardware/devices.json + feature-map.json (mirrors: memory/hardware/) |
| Pairing / connection / OTA protocols | memory/hardware/protocols.md |
| Feature registry & PRDs | docs/index.md, docs/features/<feature>/prd.md |
| Platform parity | src/platforms/parity.json + memory/platforms/ |
| Tone & voice per persona | memory/voice/tone-matrix.md |
| AI persona prompts | src/personas/prompts/ (docs: memory/voice/ai-personas.md) |
| Approved terminology per language | memory/voice/glossary.md, locale rules: memory/voice/locale-rules.md |
| Design tokens — DLS (design target) | src/tokens/design.tokens.js + tokens.css (sources: src/tokens/source/) |
| Design tokens — Android app (shipping today) | src/tokens/design.tokens.json (conflict: ADR-023) |
| DLS components (registry, graph, code) | src/components/ (rulebook: .claude/rules/design-system.md) |
| Screens, flows, icons, reusable views (android) | memory/design/ |
| Motion philosophy & tokens | memory/motion/ (canonical: src/tokens/motion.tokens.js / .json — ADR-023) |
| Analytics events | src/analytics/events.schema.json (docs: memory/analytics/event-taxonomy.md) |
| Journey → event trigger map | memory/analytics/trigger-map.md |
| Monetization surfaces | memory/analytics/monetization-map.md |
| System architecture (app topology, MVVM) | memory/architecture/system.md |
| Data models / API endpoints / connectivity / state / AI | memory/architecture/*.md |
| How the DLS was ingested & migrated | memory/architecture/design-system.md |
| Strings & locales | src/i18n/ (new system: strings.schema.json; android reality: strings.android.schema.json — ADR-024) |
| Testing / a11y / privacy / security bar | memory/quality.md |

## Enforced gates
See `.claude/rules/` — every rule there is greppable and part of the pre-commit checklist.
