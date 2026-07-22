# Event Taxonomy

**Canonical registry:** [/src/analytics/events.schema.json](../../src/analytics/events.schema.json); event constants → `utils/FireBaseAppEvents.kt`. SDK = Firebase Analytics only, via `SessionManager.fireBaseAppEvent()`.

## Naming rules (inferred from majority + proposed)
Observed dominant pattern: `<area>_<object>_<action>` snake_case (`home_anc_off_click`, `firmware_update_success`, `ai_companion_send_click`).

**Proposed canonical rules (adopt via [.claude/rules/analytics.md](../../.claude/rules/analytics.md)):**
1. `snake_case`, all lowercase (the wrapper force-lowercases anyway — so mixed case is silently masked; don't rely on it).
2. Shape: `<feature_area>_<object>_<verb>` (verb ends the name: `_click`, `_selected`, `_toggle_click`, `_success`, `_failed`, `_landing`).
3. Landing/screen-entry events end in `_landing`.
4. Prop keys come from **shared constants**, not inline literals.
5. One event per intent — don't overload one event across surfaces via a prop.

## Inconsistencies to fix (→ ADR-011)
| Issue | Example | Rule broken |
|---|---|---|
| Capital in snake_case | `login_terms_and_Conditions_optin/optout` | #1 |
| Singular vs plural prefix | `setting_profile_click` vs `settings_*` | #2 |
| Singular vs plural | `touch_gesture_action_click` vs `touch_gestures_*` | #2 |
| Stutter | `home_anc_anc_click` | #2 |
| Overloaded event | `find_my_device_play_click` (buds+headphones via `device_type`) | #5 |
| Inline param keys | `"device_name"`, `"toggle_state"`, `"anc_level"`, `"action"` everywhere | #4 |
| Inconsistent props for siblings | `play` uses `action`; toggles use `toggle_state`; some use `params` map | #4 |

## Dead / legacy
- `UIController.logAppEvent` = empty stubs (ADR-014).
- `LOGS_MOENGAGE_EVENT` tag + `moengage_banner` flag with no MoEngage SDK (ADR-014).
- No `screen_view` (ADR-015).

## Adding an event
Use [/templates/new-event.md](../../templates/new-event.md): add a `const val` to `FireBaseAppEvents.kt`, register in `events.schema.json` with props+trigger+owner F-*, fire via `sessionManager.fireBaseAppEvent(...)`.
