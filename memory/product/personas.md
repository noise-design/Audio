# Personas (P#)

**Canonical:** [/src/personas/personas.json](../../src/personas/personas.json). If they disagree, the JSON wins. This mirror adds rationale.

> ⚠️ **Stub.** No persona/segment definition exists in the repo. The IDs below are **segment signals inferred from feature code**, not validated personas. All demographics, goals, and quotes are `TODO(product/UXR)`. Do not design copy or monetization against these until a human confirms them.

| ID | Inferred segment | Signal in code | Primary devices |
|---|---|---|---|
| **P1** | Everyday commuter | ANC/Transparency noise-control usage (`F-ANC`, `home_anc_*`) | HW-BUDS-1, HW-MBUDS-2, HW-ALT-BUDS(-S) |
| **P2** | Mobile gamer | `DeviceFeatures.GAMING_MODE`, `low_lag_gaming_mode` | HW-MBUDS-2, HW-BUDS-1 |
| **P3** | Home / immersive listener | over-ear `HW-MBUDS-MAX`, spatial audio | HW-MBUDS-MAX |
| **P4** | Productivity / voice-AI user | `F-AI-VOICE`, `F-AI-TRANSCRIBE`, mic+speech perms | HW-MBUDS-2, HW-MBUDS-MAX |
| **P5** | Multi-device / open-wear user | `F-DUAL`, ALT open-wear/clip form factors | HW-ALT-OWS, HW-ALT-CLIP, HW-MBUDS-MAX |

**Why inferred, not invented:** each segment maps to a capability or feature that actually ships (cross-referenced by `HW-*`/`F-*`). That a feature exists does **not** prove a segment was targeted — hence `TODO`.

**How to complete:** UXR to replace each `TODO` in the JSON with validated goals/frustrations/demographics, prune segments that are just features, and add any real segment the code doesn't reveal (e.g. warranty-driven buyers, gift recipients). Then update [voice/tone-matrix.md](../voice/tone-matrix.md) and [analytics/monetization-map.md](../analytics/monetization-map.md), which reference these IDs.
