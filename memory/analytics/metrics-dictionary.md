# Metrics Dictionary

Definitions for metrics derivable from the event registry ([/src/analytics/events.schema.json](../../src/analytics/events.schema.json)). `TODO(data)`: pick north-star + guardrails ([../product/vision.md](../product/vision.md) success metrics are TODO).

| Metric | Definition (from events) | Notes / gaps |
|---|---|---|
| Pairing success rate | `device_pairing_success` / (`success`+`failed`) | Excludes users who never reach select |
| Activation rate | users reaching `home_device_connected` / `login_page_landing` | Blind on login-completion step (GAP) |
| ANC engagement | any `home_anc_*` per connected user | — |
| EQ engagement | `equalizer_type` or `equalizer_custom_band_change` | — |
| AI chat usage | `ai_companion_send_click` per user | consent step not measured |
| AI output failure rate | `ai_companion_output_failed` / (`generated`+`failed`) | — |
| Firmware update completion | `firmware_update_success` / `firmware_update_device_click` | No per-stage drop-off (GAP) |
| Language adoption | `app_language_selected` by `language` | — |
| Shop CTR | `home_shop_click` / connected users | destination attribution TODO |

## Definitions to standardize (TODO)
- "Active user", "connected session", "AI session" — not defined in code.
- Event params are inline literals (ADR-011) — dashboards depend on exact key spelling; extract constants first.
- No user-property catalog documented beyond `setFirebaseUserAttributes` (`SessionManager.kt:315,418`) — `TODO(data)`: enumerate user properties set.
