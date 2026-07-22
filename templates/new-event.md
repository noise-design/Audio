# Template: New Analytics Event

Rule file: [/.claude/rules/analytics.md](../.claude/rules/analytics.md). Taxonomy: [/memory/analytics/event-taxonomy.md](../memory/analytics/event-taxonomy.md).

1. **Name** it `<area>_<object>_<verb>` snake_case, verb last (`_click`/`_selected`/`_toggle_click`/`_success`/`_failed`/`_landing`). No capitals, no stutter, correct singular/plural.
2. **Add a constant** to `app/src/main/java/com/noise/audio/utils/FireBaseAppEvents.kt`:
```kotlin
const val my_area_object_verb = "my_area_object_verb"
```
3. **Fire it** via the wrapper (never inline literal, never `logAppEvent`):
```kotlin
sessionManager.fireBaseAppEvent(FireBaseAppEvents.my_area_object_verb)
// with props:
sessionManager.fireBaseAppEvent(FireBaseAppEvents.my_area_object_verb, hashMapOf(EventParams.DEVICE_NAME to name))
```
   Param keys should be constants (see ADR-011), not inline strings.
4. **Register** in [/src/analytics/events.schema.json](../src/analytics/events.schema.json):
```json
{ "name": "my_area_object_verb", "props": ["device_name"], "trigger": "SomeFragment.kt:NN", "owner": "F-AREA" }
```
5. If it maps to a journey step, add it to [/memory/analytics/trigger-map.md](../memory/analytics/trigger-map.md).

**Checklist:** [ ] constant added [ ] registered w/ trigger+owner [ ] taxonomy-compliant [ ] fired via `fireBaseAppEvent`.
