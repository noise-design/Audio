# Adding a new string (new feature copy)

1. Choose the domain by meaning: common, onboarding, pairing, firmware, soundControl,
   gestures, findMy, profile, settings, marketing, assistant, errors. If nothing fits,
   use `common`.

2. Add the key to `src/i18n/locales/en/<domain>.json` FIRST. English is the parent —
   the key does not exist until en defines it. Use the going-forward key format
   `<domain>.<screen-or-element>.<variant?>`, e.g.:

   ```json
   "soundControl.audioBoost.title": {
     "default": "Audio Boost"
   }
   ```

3. Add translations to the other locales as they come in. Missing ones fall back to en.

   ```json
   // de/soundControl.json
   "soundControl.audioBoost.title": { "default": "Audio Boost" }
   // hi/soundControl.json
   "soundControl.audioBoost.title": { "default": "ऑडियो बूस्ट" }
   ```

4. Reference it in code: `t('soundControl', 'soundControl.audioBoost.title')`.
   Never hardcode the literal string in a component.

5. Run `python3 scripts/i18n-check.py`. Regenerate the worklist if desired:
   `python3 scripts/gen-worklist.py`.
