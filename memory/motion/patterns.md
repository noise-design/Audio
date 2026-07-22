# Motion Patterns (as implemented)

**Canonical timing:** [/src/tokens/motion.tokens.json](../../src/tokens/motion.tokens.json). Observed patterns below with file:line; inconsistencies feed ADR-012.

## Screen transitions (`res/anim/`)
Slide in/out (up/down/left/right) mostly `300ms` with `accelerate_decelerate`; `enter_from_down`/`exit_from_up` `400ms` linear; `rotate.xml` `900ms` linear (spinner).

## Interactive control animations (View)
- EQ curve: `EqualizerView.kt` 180ms (`:759,806`), 300ms (`:938`), Decelerate.
- Audio bars: `AudioBarsView.kt` 120ms min (`:271`), 360ms (`:344`), Linear/AccelerateDecelerate.
- ANC FAB: `FAB_ANIM_TIME=500L` (`ActiveNoiseCancellationViewModel.kt:24`).
- Status banner: `ANIMATION_DURATION_MS=300L` (`TopStatusBanner.kt`).
- Touch gesture: 300ms (`TouchGestureFragmentV2.kt:504`).

## Intro / hero animations
- Login: `ANIM_DEFAULT_DURATION=1000L` + `2000ms` finales (`LoginFragment(V2).kt`).
- Device setup / meet device: `2000ms` (`DeviceSetupVideoFragment(V2).kt`, `MeetDeviceFragment.kt`); staged `120/160/500ms` micro-steps in V2.
- Splash: 300ms (`SplashActivity.kt:75-76`).

## Compose motion (rare)
Only `FaqScreen.kt`: `tween(250)` chevron rotate + `expand/shrinkVertically(tween(250, LinearOutSlowInEasing))`.

## Rules for new work
1. Use `motion.tokens.json` duration steps + a named easing — no raw literals.
2. **Honor reduced-motion** (fall back to `instant`/cross-fade). Currently absent everywhere.
3. Don't add a 4th copy of a duration constant — reference the token.
See [.claude/rules/motion.md](../../.claude/rules/motion.md).
