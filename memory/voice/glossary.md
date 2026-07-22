# Glossary (domain terms)

Canonical terms and their user-facing string. Use these consistently; the i18n key is the source ([/src/i18n/strings.schema.json](../../src/i18n/strings.schema.json)).

| Term | User-facing (string key) | Meaning |
|---|---|---|
| ANC / Noise Control | "NOISE CONTROL" (`active_noise_cancellation`), "ANC" (`text_noise_cancel`) | Active Noise Cancellation mode |
| Transparency | "Transparency" (`text_transparency`) | Pass-through ambient mode |
| Equaliser | "Equaliser" (`text_equalizer`) | EQ (British spelling in UI) |
| Buds / Earbuds | "FIND MY EARBUDS", "Personalise your buds" | TWS earbuds (in-ear form factors) |
| Headphones | (Master Buds Max) | Over-ear form factor (`HW-MBUDS-MAX`) |
| Case | colorway roles (buds/case/left/right) | Charging case |
| Firmware | "Firmware Update" (`text_firmware_update`) | Device firmware / OTA |
| Gaming / Low-lag mode | "Low Lag/Gaming mode" (`low_lag_gaming_mode`) | Low-latency audio mode |
| Noise AI | "Noise AI" | The AI assistant (name pending, ADR-008) |
| Dual pairing | (`F-DUAL`) | Multi-point connection (headphones) |

## Terms to AVOID (wrong-brand / heritage — ADR-008/017)
- "Luna", "Luna ring", "AI coach", "nutritional advice", "workout" — fitness-app leftovers; not part of Noise Audio.
- "NoiseFit" / "noise_fit" — heritage naming in DB/prefs only; not user-facing.

`TODO(content)`: expand with device marketing names, warranty terms, and approved capitalization.
