# Monetization Map

> ⚠️ **Mostly stub.** No monetization/IAP/paywall code found. Signals below are the only revenue-adjacent surfaces in the app. `TODO(growth/product)` to define strategy. Format: surface → arming trigger (journey ID) → eligible personas → string keys → events fired.

| Surface | Arming trigger | Eligible personas | Strings | Events | Status |
|---|---|---|---|---|---|
| **Shop / store** | Home & AI-home "shop" entry | TODO(product) | TODO | `home_shop_click` | Only confirmed commerce surface — links out (destination TODO) |
| **AI usage limit** | 429 on chat/voice/transcribe | P4 | `text_ai_consent`, "Limit Reached" (hardcoded, `AiChatViewModel.kt:236`) | **GAP: no limit-reached event** | Rate-limited AI hints at a possible paid tier — `TODO(product)`: is there a premium AI plan? |
| **Rate & Earn / rewards** | `F-RATE-EARN` completion | TODO | rate/earn strings | `/rewards/rae/claim` (endpoint, not evented) | Reward, not monetization; confirm |
| **Warranty / purchase channel** | `F-WARRANTY` registration | TODO | warranty strings | `getPurchaseChannels` | Retention/support, not direct revenue |

## Open questions (TODO)
- Is there a **premium tier** (esp. for Noise AI given the quotas/429s)? No paywall/billing code exists today.
- Where does "shop" navigate, and is it attributed?
- Should AI limit-reached fire an event to measure upsell opportunity? (currently no event — instrumentation gap).

Cross-ref: personas [../product/personas.md](../product/personas.md), AI limits [../architecture/ai-integration.md](../architecture/ai-integration.md).
