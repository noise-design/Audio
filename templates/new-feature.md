# Template: New Feature

1. **Mint the ID** `F-<AREA>` and add a row to [/docs/index.md](../docs/index.md) (name, status, owning screens, endpoints).
2. **PRD** — create `docs/features/<feature>/prd.md` from the block below.
3. **Register** owning screens (`S-*`) in [/memory/design/screens.md](../memory/design/screens.md), journeys (`J-*`) in [/memory/product/journeys.md](../memory/product/journeys.md), events in [/src/analytics/events.schema.json](../src/analytics/events.schema.json).
4. **Parity** — add the `F-<AREA>` row to [/src/platforms/parity.json](../src/platforms/parity.json) (same-PR rule).
5. If device-dependent, add capability rows to [/src/hardware/feature-map.json](../src/hardware/feature-map.json).

## PRD skeleton
```markdown
# PRD — F-<AREA>: <name>
**Status:** stub. **Owning screens:** <S-*/navId>. **Endpoints:** <...>.
## Summary
<one paragraph>
## Declares (acceptance criteria)
- AC-1 <criterion> (✓ if verifiable from code with file:line, else TODO(owner))
- AC-2 ...
## Scope block
- In scope: ...
- Out of scope: ...
- Risks / ADRs: <ADR-###>
## States
loading/empty/error + (if device-dependent) disconnected/connecting/reconnecting/DFU
```
