# Noise Audio — Localization (i18n)

Canonical home for every user-facing string in the Noise Audio app. This directory
is the single source of truth; `memory/voice/*` markdown mirrors must defer to it.

## Layout

```
src/i18n/
├── strings.schema.json     # THE spec: key format, value shape, resolution order, rules
├── locales.json            # Registry of available locales (parent first)
├── index.js                # Runtime loader + t() resolver (reference implementation)
├── _catalog.json           # Merged source data (en/de/hi) used to regenerate files
├── README.md               # This file
└── locales/
    ├── en/                 # PARENT — source of truth, defines every key
    │   ├── common.json
    │   ├── onboarding.json
    │   ├── pairing.json
    │   ├── firmware.json
    │   ├── soundControl.json
    │   ├── gestures.json
    │   ├── findMy.json
    │   ├── profile.json
    │   ├── settings.json
    │   ├── marketing.json
    │   ├── assistant.json
    │   └── errors.json
    ├── de/                 # German — same filenames; omitted keys fall back to en
    └── hi/                 # Hindi  — same filenames; omitted keys fall back to en
```

## The two rules that matter most

1. **English is the parent.** A key must exist in `en/<domain>.json` before it can exist
   in any other locale. Other locales translate a *subset*; anything they don't have falls
   back to English at runtime (the app never shows a blank).
2. **One key, many renditions.** Every key maps to an object with a required `default` and
   optional per-persona overrides (`P1`, `P2`, …). Locale and persona are independent axes —
   never copy-paste a whole file to make a persona variant.

```jsonc
// en/onboarding.json
{
  "continue_with_email": {
    "default": "Continue with email",
    "P1": "Let's use your email 👋"   // optional persona override
  }
}
```

Resolution order (see `strings.schema.json` for the authoritative version):
`locale → key → persona variant → key.default → en fallback → literal key (logged)`.

## Value shape & escapes

- `\n` inside a value is a **hard line break** in the UI label — keep it.
- Acronyms stay in Roman script in every locale: **ANC, EQ, BT, OTP, TWS, IPX5, AI**.
- EQ preset names and absorbed loanwords are transliterated, not translated (see the
  Hindi file header for the full rule set that was applied).

## Keys

Existing keys are the **legacy iOS keys**, preserved verbatim as stable IDs (a mix of
`snake_case`, `camelCase`, and literal-English UI labels like `"CONNECT"`). They are kept
as-is so the shipping app keeps resolving — **do not rename a key without a migration**.

New strings **should** use the going-forward format: `<domain>.<screen-or-element>.<variant?>`
e.g. `onboarding.email.title`.

## How to add a new language

1. `mkdir src/i18n/locales/<code>` (e.g. `fr`).
2. Copy the filenames from `en/` and translate each `default` value. You can translate
   incrementally — see `MISSING-KEYS.md` at the repo root for the outstanding worklist.
3. Register it in `locales.json` (`available[]`) and in `strings.schema.json`
   (`locales`, `localeNames`).
4. Run `python3 scripts/i18n-check.py`. Missing keys are warnings (they fall back to en),
   orphan keys (present in the new locale but not in en) are hard errors.

## How to add a new string (new feature copy)

1. Add the key to the correct domain file in **`en/` first** — this *defines* the string.
   Pick the domain by meaning; if nothing fits, use `common.json`.
2. Add translations to `de/`, `hi/`, etc. as they're localized. Until then, they fall back
   to English automatically.
3. Never hardcode the string in a component — reference it via `t('<domain>', '<key>')`.
4. Run `python3 scripts/i18n-check.py` before committing.

## Scripts

- `scripts/i18n-check.py` — CI gate: validates JSON, enforces the value shape, flags orphan
  keys, and prints per-locale coverage. Exit non-zero on hard failures.
- `scripts/gen-worklist.py` — regenerates `MISSING-KEYS.md` (the per-locale translation
  backlog) from `_catalog.json`.

## Provenance & `_todo` markers

These files were generated from two snapshots: `german_65_.rtf` (German) and
`full_hindi_strings.txt` (Hindi). English was derived from the keys: literal-English keys
are used verbatim; **slug keys** (e.g. `enter_email_address`) were auto-humanized into a
best-effort English string and flagged with a `_todo` field. An owner should confirm those
~175 English strings — in several cases the real copy is a marketing headline the slug
doesn't reveal (e.g. `create_account_using_email` actually renders "Experience pure audio,
your way", visible in the de/hi translations). The `_todo` markers are safe to leave in the
JSON; the loader ignores unknown fields.
