# Motion Philosophy

**Canonical timing:** [/src/tokens/motion.tokens.json](../../src/tokens/motion.tokens.json).

> ⚠️ **No documented motion philosophy exists, and the code does not exhibit a consistent one.** Rather than declare a philosophy that isn't there, this records the observed variants and defers to an ADR.

## Observed (not a philosophy — a description)
- **De-facto default duration is 300ms** (`res/anim/*`, `dimens animation_duration`, `ANIMATION_DURATION_MS`), but ~13 distinct durations are used (0/120/160/180/250/300/360/400/500/600/900/1000/2000ms).
- **Easing is inconsistent:** AccelerateDecelerate (most View animations), Decelerate (some enters), Linear (spinners/rotation), LinearOutSlowInEasing (one Compose screen). No convention ties an easing to an intent.
- **Longer, "showy" durations** (1000–2000ms) are used on login and device-setup/meet-device intros; short ones (120–360ms) on interactive controls (EQ, audio bars, banners).
- **No reduced-motion support anywhere** — a hard accessibility gap.

## Decision needed → ADR-012
A single philosophy (e.g. "functional motion: 180ms micro / 300ms standard / decelerate-in, accelerate-out; hero intros ≤600ms; always honor reduced-motion") should be **decided by design**, not invented here. Until then, use the token scale and the mandatory reduced-motion rule. See [patterns.md](patterns.md) and [.claude/rules/motion.md](../../.claude/rules/motion.md).
