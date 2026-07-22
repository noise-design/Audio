# Feature × Device Matrix (human-readable)

**Canonical:** [/src/hardware/feature-map.json](../../src/hardware/feature-map.json). Runtime truth is computed in [AudioSDK.kt](../../app/src/main/java/com/noise/audio/audio/AudioSDK.kt) by `DeviceType`-branching (ADR-002).

Legend: ✅ supported · ⚠️ degraded · ❌ unsupported · ❔ TODO(verify) — recon did not surface a per-model truth value; confirm against the `AudioSDK.kt` resolver before relying on it.

| Feature ↓ / Device → | BUDS-1 | MBUDS-2 | MBUDS-MAX | BRIDGE | ALT-OWS | ALT-CLIP | ALT-BUDS-S | ALT-BUDS |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Battery (`F-HOME-BATTERY`) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ANC (`F-ANC`) | ❔ | ❔ | ❔ | ❔ | ❔¹ | ❔ | ❔ | ❔ |
| EQ (`F-EQ`) | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ |
| Spatial (`F-SOUND-SPATIAL`) | ❔ | ✅² | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ |
| Gaming (`F-SOUND-GAMING`) | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ |
| Audio Boost | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ |
| Touch (`F-TOUCH`) | ❔ | ❔ | ⚠️³ | ❔ | ❔ | ✅⁴ | ✅⁴ | ❔ |
| Motion (`F-MOTION`) | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ |
| Wear detection | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ | ❔ |
| Dual pairing (`F-DUAL`) | ❔ | ❔ | ✅ | ❔ | ❔ | ❔ | ❔ | ❔ |
| Firmware OTA (`F-FIRMWARE`) | ✅ | ✅ | ✅ | ✅ | ✅ | ❔ | ⚠️⁵ | ⚠️⁵ |

Notes:
1. Open-wear form factor typically has no ANC — verify.
2. `showSpatialInfo()` is hardcoded `true` only for MASTER_BUDS_2 (`AudioSDK.kt:186-196`).
3. Headphone button model differs from buds touch (`isMax` branches, `TouchGestureFragmentV2.kt:55,67-68`).
4. Four-tap supported only on ALT_BUDS_S & ALT_CLIP (`hasFourTapSupport`, `TouchGesturesViewModelV2.kt:300-303`).
5. JL-chip OTA has documented quirks/workarounds (ADR-016).

**Why so many ❔:** capabilities are not enumerated statically anywhere — they are derived by model-branching at runtime. Producing a fully-confirmed matrix requires reading each `when(DeviceType)` truth value in `AudioSDK.kt` resolvers (`getDashboardFeatures`, `getSoundGroupFeatures`, `getControlGroupFeatures`) and per-model helpers. This is the strongest argument for ADR-002 (attach capability sets to devices).
