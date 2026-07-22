# Template: New Motion Pattern

Rule file: [/.claude/rules/motion.md](../.claude/rules/motion.md). Tokens: [/src/tokens/motion.tokens.json](../src/tokens/motion.tokens.json).

1. **Pick a duration token**, don't invent a millisecond value:
   `instant(0) · micro(120) · fast(180) · base(300) · moderate(400) · slow(500) · slower(600) · deliberate(900) · intro(1000) · hero(2000)`.
2. **Pick a named easing** (standard / decelerate / linear) with a reason.
3. **Reduced-motion (mandatory):** guard the animation — if system animator scale == 0 or reduce-motion is on, fall back to `instant`/cross-fade.
```kotlin
val d = if (reduceMotion) MotionTokens.instant else MotionTokens.base
```
4. **Document** the pattern in [/memory/motion/patterns.md](../memory/motion/patterns.md) with file:line.
5. Don't add a new local duration constant — reference the token.

**Checklist:** [ ] token duration (no raw literal) [ ] named easing [ ] reduced-motion fallback [ ] documented in patterns.md.
