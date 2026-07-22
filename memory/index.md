# Memory Index — master map

Question → file (→ section). Every knowledge file created by the bootstrap is reachable from here. Format: **do a thing → where**.

> First time here? Read [session-handoff.md](session-handoff.md), then [decisions.md](decisions.md).

## Spine
- Routing / rules → [/CLAUDE.md](../CLAUDE.md)
- Current state, open questions, next steps → [session-handoff.md](session-handoff.md)
- What the bootstrap populated vs stubbed → [changelog.md](changelog.md)
- Open conflicts & decisions (ADR log) → [decisions.md](decisions.md)

## Product
- Why the product exists, positioning → [product/vision.md](product/vision.md) *(stub, TODO product)*
- Who we build for (personas `P#`) → [product/personas.md](product/personas.md) + canonical [/src/personas/personas.json](../src/personas/personas.json)
- User journeys (`J-<FLOW>-##`) → [product/journeys.md](product/journeys.md)
- What is in/out of scope → [product/scope-ledger.md](product/scope-ledger.md) *(stub)*

## Hardware (devices `HW-*`, capabilities)
- Device catalog + capabilities → canonical [/src/hardware/devices.json](../src/hardware/devices.json), mirror [hardware/devices.md](hardware/devices.md)
- Feature → capability → per-device support → canonical [/src/hardware/feature-map.json](../src/hardware/feature-map.json), grid [hardware/feature-matrix.md](hardware/feature-matrix.md)
- Pairing / connection lifecycle / OTA / error taxonomy → [hardware/protocols.md](hardware/protocols.md)
- **Adding a device?** → [/templates/new-device.md](../templates/new-device.md) + rule [.claude/rules/hardware.md](../.claude/rules/hardware.md)

## Features & platforms
- Feature registry (`F-*`, status, PRD, owning screens) → [/docs/index.md](../docs/index.md)
- A feature's PRD + acceptance criteria → [/docs/features/](../docs/features/)
- Platform parity matrix → canonical [/src/platforms/parity.json](../src/platforms/parity.json)
- Android conventions / quirks / gaps → [platforms/android.md](platforms/android.md)
- iOS ledger → [platforms/ios.md](platforms/ios.md) *(stub — separate repo)*
- Backend ledger → [platforms/backend.md](platforms/backend.md) *(stub — separate repo)*
- **Adding a feature?** → [/templates/new-feature.md](../templates/new-feature.md)

## Design & motion
- Color / spacing / type tokens → canonical [/src/tokens/design.tokens.json](../src/tokens/design.tokens.json), mirror [design/tokens.md](design/tokens.md)
- Reusable components → [design/components.md](design/components.md)
- Screen registry (`S-*`) → [design/screens.md](design/screens.md)
- Flow state machines (loading/error/empty/hardware states) → [design/flows.md](design/flows.md)
- Icons / drawables → [design/icons.md](design/icons.md)
- Animation durations / easings → canonical [/src/tokens/motion.tokens.json](../src/tokens/motion.tokens.json)
- Motion philosophy & patterns → [motion/philosophy.md](motion/philosophy.md), [motion/patterns.md](motion/patterns.md)
- **New motion pattern?** → [/templates/new-motion-pattern.md](../templates/new-motion-pattern.md), rule [.claude/rules/motion.md](../.claude/rules/motion.md)

## Voice, language & AI
- String catalog schema + key rules → canonical [/src/i18n/strings.schema.json](../src/i18n/strings.schema.json), rule [.claude/rules/voice-and-language.md](../.claude/rules/voice-and-language.md)
- Tone per persona × context → [voice/tone-matrix.md](voice/tone-matrix.md) *(structure only, TODO)*
- AI assistant persona(s) → [voice/ai-personas.md](voice/ai-personas.md)
- Domain glossary → [voice/glossary.md](voice/glossary.md)
- Locale / RTL / translation rules → [voice/locale-rules.md](voice/locale-rules.md)
- How the AI features actually work → [architecture/ai-integration.md](architecture/ai-integration.md)

## Analytics & monetization
- Event registry → canonical [/src/analytics/events.schema.json](../src/analytics/events.schema.json), taxonomy [analytics/event-taxonomy.md](analytics/event-taxonomy.md)
- Journey step → event mapping (+ gaps) → [analytics/trigger-map.md](analytics/trigger-map.md)
- Funnels → [analytics/funnels.md](analytics/funnels.md)
- Monetization surfaces → [analytics/monetization-map.md](analytics/monetization-map.md) *(stub)*
- Metric definitions → [analytics/metrics-dictionary.md](analytics/metrics-dictionary.md)
- **Adding an event?** → [/templates/new-event.md](../templates/new-event.md), rule [.claude/rules/analytics.md](../.claude/rules/analytics.md)

## Architecture & data
- System topology (who owns what) → [architecture/system.md](architecture/system.md)
- Canonical entity shapes (+ divergences) → [architecture/data-models.md](architecture/data-models.md)
- Every API endpoint → [architecture/api-contracts.md](architecture/api-contracts.md)
- State management patterns → [architecture/state-management.md](architecture/state-management.md)
- Connectivity / sync / offline → [architecture/connectivity.md](architecture/connectivity.md)

## Quality, rules & templates
- Testing / a11y / privacy / security bar → [quality.md](quality.md)
- Enforceable rules (each with grep + pre-commit checklist) → [.claude/rules/](../.claude/rules/)
- Shared canonical fixtures → [/data/fixtures/entities/](../data/fixtures/entities/)
- Task templates → [/templates/](../templates/)

## Design system (Figma DLS — canonical for design)
- Component registry (26 components, ids/fingerprints) → canonical [/src/components/registry.yaml](../src/components/registry.yaml)
- Component metadata → [/src/components/{atoms,molecules,organisms}/](../src/components/)
- Component graph (typed edges) → [/src/components/graph.json](../src/components/graph.json)
- Coded implementations (16 of 26) → [/src/components/code/](../src/components/code/) — gap list in [session-handoff.md](session-handoff.md)
- DLS tokens (design target) → [/src/tokens/design.tokens.js](../src/tokens/design.tokens.js) + tokens.css; sources in [/src/tokens/source/](../src/tokens/source/)
- Android shipping tokens (reality today) → [/src/tokens/design.tokens.json](../src/tokens/design.tokens.json) — conflict: ADR-023
- Composition rulebook + gates → [.claude/rules/design-system.md](../.claude/rules/design-system.md)
- How the DLS was ingested/migrated → [architecture/design-system.md](architecture/design-system.md), audit: [architecture/ingestion-report.md](architecture/ingestion-report.md)

## i18n (two schemas — ADR-024)
- NEW i18n system (canonical) → [/src/i18n/strings.schema.json](../src/i18n/strings.schema.json), locales in [/src/i18n/locales/](../src/i18n/locales/), worklist [/MISSING-KEYS.md](../MISSING-KEYS.md), scripts [/scripts/](../scripts/)
- Android strings.xml reality → [/src/i18n/strings.android.schema.json](../src/i18n/strings.android.schema.json)
