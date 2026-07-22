# Changelog

## 2026-07-22 — Android codebase memory merged in
**What:** Merged the knowledge bootstrap of the Android app (`com.noise.audio` v4.7.3, extracted 2026-07-21) into this project.
- memory/: added hardware/, platforms/, design/, quality.md, 5 architecture docs (system, data-models, api-contracts, connectivity, state-management, ai-integration); replaced product/, voice/, analytics/, motion/ stubs with populated files. Previous design-system system.md moved to memory/architecture/design-system.md.
- src/: added design.tokens.json + motion.tokens.json (android-extracted), platforms/parity.json; replaced stubs for hardware/*.json (8 devices, 19 flags), personas.json, analytics/events.schema.json (~171 events); android strings schema stored as src/i18n/strings.android.schema.json (did NOT replace the new i18n system's schema).
- docs/: feature registry (docs/index.md, ~30 areas) + 5 PRDs (auth, pairing, anc, firmware, ai-voice).
- .claude/rules/: analytics, code-style, motion, voice-and-language stubs replaced; hardware.md added; android design-system rules appended to design-system.md below the DLS gates.
- templates/: 6 codebase templates added alongside scaffold set (see ADR-025).
- data/fixtures/: entities (users, devices) + README.
- decisions.md: codebase ADR-001..018 adopted as-is; migration ADRs renumbered 019..022; new OPEN conflicts ADR-023 (token duality), ADR-024 (string schema duality), ADR-025 (template dupes).
- All relative links rewritten for this project's layout (flat bootstrap -> memory/ + src/ + docs/ + .claude/rules/).
**Why:** single master project per the memory architecture; android knowledge was the missing platform layer.
**Verified:** 51 JSON files parse; 25 ADRs, no duplicate IDs; all internal markdown links resolve. NOTE: links to `app/`, `common/`, `bes/` files are citations into the Android repo (separate codebase, not present here) and will not resolve locally, by design.

## 2026-07-21 — Bootstrap: knowledge/memory architecture created
Read-only w.r.t. app code (`app/`, `bes/`, `besSdk/`, `common/`). Built the four-layer system: `CLAUDE.md` routes → `memory/` holds → `docs/` plans → `.claude/rules/` enforces, with canonical machine-readable files under `src/`.

**Reconnaissance:** 7 parallel read-only sweeps (analytics, design+motion, i18n, hardware/BLE, architecture/data/API, AI, features/screens/nav) over `com.noise.audio` (v4.7.3, versionCode 473) across the 4 Gradle modules.

**Populated from code evidence:**
- Hardware: 8 device models from `DeviceType.kt` → [/src/hardware/devices.json](../src/hardware/devices.json); 19 capability flags from `DeviceFeatures.kt`; feature→device matrix from `AudioSDK.kt` logic → [/src/hardware/feature-map.json](../src/hardware/feature-map.json).
- Analytics: ~171 event constants (164 fired) from `FireBaseAppEvents.kt` → [/src/analytics/events.schema.json](../src/analytics/events.schema.json).
- Design: 100+ color tokens from `colors.xml`, type/spacing from `dimens.xml`/`styles.xml` → [/src/tokens/design.tokens.json](../src/tokens/design.tokens.json); motion durations/easings → [/src/tokens/motion.tokens.json](../src/tokens/motion.tokens.json).
- i18n: 1155 strings / 17 locales cataloged → [/src/i18n/strings.schema.json](../src/i18n/strings.schema.json).
- Architecture: MVVM+Repository+Hilt+Flow; ~40 API endpoints tabulated; entities + divergences; state/persistence → [architecture/](architecture/).
- AI: 4 server-backed features (voice/chat/transcribe/summarize) fully evidence-based → [architecture/ai-integration.md](architecture/ai-integration.md).
- Features/screens: ~106 screens, 30 feature areas, onboarding flow reconstructed → [/docs/index.md](../docs/index.md), [design/screens.md](design/screens.md).
- Platform parity seeded (Android = implemented; iOS/backend = TODO, separate repos) → [/src/platforms/parity.json](../src/platforms/parity.json).

**Stubbed with `TODO(owner)` (no in-repo evidence):**
- Product vision, personas (`P#`), monetization, tone matrix content, scope ledger.
- Journeys are **reconstructed from nav/route order** and flagged "inferred, needs product confirmation".
- iOS + backend platform ledgers (separate repos not present here).

**Verified:** greppable gate baselines recorded in each `.claude/rules/*.md` (see [session-handoff.md](session-handoff.md) §baselines).

**Conflicts opened:** ADR-001…ADR-018 in [decisions.md](decisions.md) (ADR-001 keystore secrets is security-critical).

**Not done (out of scope this run):** no app-code edits; violation *fixes* deferred to owners; iOS/backend evidence not gatherable from this repo.

## 2026-07-20 — Design-system migration: Audio becomes the master project
**What:** Merged the two legacy repos into Audio per the new memory architecture.
- From `Noise-Audio` (Jul 10, canonical): registry.yaml, 26 component yamls, graph.json,
  token yamls + tokens.css, INGESTION_REPORT (→ memory/architecture/ingestion-report.md),
  AGENT.md (→ .claude/rules/design-system.md, verbatim), dashboard/graph scripts (→ scripts/design-system/).
- From `noiseAudio` (Jul 7): 16 coded components (→ src/components/code/<id>/), typography.css,
  per-token usage yamls (→ src/tokens/source/*.usage.yaml).
- Generated src/tokens/design.tokens.js from the canonical yaml sources.
- Appended 55-alias compatibility layer to tokens.css (legacy --token-* names → canonical names);
  fixed dangling `--token-button-radio-off-stroke` reference (legacy typo).
- Registry token path updated: tokens/spacing.yaml → tokens/source/spacing.yaml (all other paths resolve as-is relative to src/).
- i18n: deleted duplicate noise-audio-i18n/ working copy (was identical to src/i18n); moved its scripts to scripts/i18n/.
**Why:** ADR-019..022 (renumbered on 2026-07-22) in memory/decisions.md.
**Verified:** all 33 CSS vars used by coded components resolve; 26/26 registry paths resolve; 0 unmapped aliases; i18n diff clean before delete.
