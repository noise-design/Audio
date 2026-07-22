# Template: ADR (Architecture Decision Record)

Add new ADRs to [/memory/decisions.md](../memory/decisions.md)) (table row + section). Use the next `ADR-###`.

```markdown
## ADR-### — <short title>
**Status:** OPEN · **Severity:** low | medium | high | security-critical
**Context:** <what was observed, with file:line evidence>
**Conflict / duplication:** <why it's a problem — which canonical rule it breaks>
**Options (not decided):** (a) … (b) … — do NOT pick a winner in code before this is resolved.
**Question for owner:** <the specific decision a human must make>
**Owner:** <team>
```

Rules:
- **Flag, don't decide.** Record the conflict; a human resolves it.
- Cite evidence by `file:line`.
- When resolved, set Status to ACCEPTED/REJECTED/SUPERSEDED and note the outcome + date; update any code/docs that referenced it.
