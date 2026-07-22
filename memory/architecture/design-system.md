# System Architecture — Noise Audio

## Design-system pipeline
Figma (file `QjVyM5bRXgIOZn8PO1e0eK`, page "Test pilot run", node `2025:148`) is the visual master.
It was ingested 2026-07-10 (Phases 1–3, see `ingestion-report.md`) into a machine-readable mirror,
migrated here 2026-07-20 from the legacy `Noise-Audio` repo.

## Layout (canonical homes)
| What | Where |
|---|---|
| Component registry (entry point) | src/components/registry.yaml — paths inside are relative to `src/` |
| Component metadata (26: 16 atoms, 2 molecules, 8 organisms) | src/components/{atoms,molecules,organisms}/<id>.yaml |
| Component graph (typed edges, usage counts) | src/components/graph.json |
| Coded implementations (16 components, from legacy `noiseAudio`) | src/components/code/<id>/<id>.{html,css} |
| Token values (CSS, light+dark via [data-theme]) | src/tokens/tokens.css (+ legacy --token-* alias layer at bottom) |
| Token values (JS) | src/tokens/design.tokens.js (generated from source/*.yaml) |
| Token sources (Figma-synced YAML) | src/tokens/source/*.yaml (`*.usage.yaml` = per-token usage/anti-patterns, from legacy noiseAudio) |
| Typography classes | src/tokens/typography.css |
| Composition rulebook + gates | .claude/rules/design-system.md |
| Ingestion audit | memory/architecture/ingestion-report.md |
| Dashboard/graph generators (need path adaptation) | scripts/design-system/*.py |

## Provenance
- `Noise-Audio` repo (Jul 10) → metadata, registry, graph, tokens, rulebook. CANONICAL.
- `noiseAudio` repo (Jul 7) → coded .html/.css for 16 components + per-token usage metadata. Values verified compatible.
- Both legacy repos left untouched in the parent folder.
