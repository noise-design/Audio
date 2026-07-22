# Locale / Translation Rules

**Canonical:** [/src/i18n/strings.schema.json](../../src/i18n/strings.schema.json). String content = `res/values*/strings.xml`.

## Facts
- **1155 base strings**, 17 translated locales (~99% complete each), **0 plurals / 0 string-arrays**.
- Key convention: `text_` snake_case (canonical).
- Runtime locale: `LocaleHelper` (`utils/LocaleHelper.kt`), selection in `MyApplication.userLanguage`, applied via `attachBaseContext`.
- RTL: `ar`, `he`/`iw`; `drawable-ldrtl-*` mirroring present.
- Format specifiers used in 21 base strings (`%s`/`%d`/`%1$…`).

## Rules for PRs
1. New user-facing copy MUST be a `text_`-prefixed string resource — no hardcoded literals (baseline ~15-18 violations, see schema).
2. Add the key to **base `values/strings.xml`** first; translations follow.
3. **No plurals today** — if a count-dependent string is needed, introduce `<plurals>` properly rather than string concatenation.
4. Don't create an unprefixed duplicate of an existing `text_` key (ADR-009).

## Open issues (ADR-010)
- `values-kr` is **mislabeled** — Android Korean is `ko`. Rename `values-kr` → `values-ko` (current folder never resolves for Korean).
- `values-he` + `values-iw` both exist; `LocaleHelper.kt:13` maps `he`→`iw`. Consolidate to avoid drift.

`TODO(loc)`: confirm the target locale list, translation pipeline/vendor, and whether `text_`-cleanup (ADR-009) can be automated.
