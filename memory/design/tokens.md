# Design Tokens

**Canonical:** [/src/tokens/design.tokens.json](../../src/tokens/design.tokens.json) (extraction/target) — but **code today reads `app/src/main/res/values/colors.xml` + `dimens.xml` + `styles.xml`**. Until a Compose token layer is generated (ADR-006), the XML resources win for the View system. If the JSON and colors.xml disagree, colors.xml is what ships.

## Reality
- **~100 color tokens** in `colors.xml`, heavily duplicated (`#43555E` under 8+ names; `#54656D`, `#879399`, `#4C5252`, `#232726` each under many). Colors are organized by **device finish/colorway** (black / titanium gold / white / silver / buds), each with a full set of case/buds/left/right state roles.
- **Compose has NO real token layer.** `ui/theme/Color.kt` holds only 6 unused Material-template purples; `ui/theme/Theme.kt` sets `dynamicColor = true` (Android 12+ paints from wallpaper, ignoring brand). Compose screens redeclare hexes as local `private val`s (FaqScreen, BackgroundManagementScreen, AppLanguageScreen, AboutScreen, NoiseCollapsingScaffold) — direct duplication of XML tokens.
- **Fonts:** Clash Display (regular/medium/semibold), Roboto Mono (regular/italic/medium). Compose `Typography` defines only `bodyLarge`; sizes are raw `.sp` per screen.
- **Spacing:** dp scale in `dimens.xml`; 16dp is the default screen margin (under ~7 aliases). No Compose spacing tokens.

## Violations (baseline — see [.claude/rules/design-system.md](../../.claude/rules/design-system.md))
- `Color(0x…)` in Kotlin bypassing tokens: **~30**.
- Raw `.dp` in Compose: **~54**. Raw `.sp` in Compose: **~33**.
- Raw hex in XML styles/themes instead of `@color/`: several (`themes.xml:7,8,10,19,68,264`, `styles.xml:54,58`).
- `#BB1515`/`#1E8D29` re-hardcoded inline in `AboutScreen.kt:109` (already exist as `warranty_rejected`/`warranty_approved`).

## Bugs
- `ShapeAppearanceOverlay.App.CornerSize16dp` actually sets **14dp** (`themes.xml:36-38`).

## Migration target (ADR-006)
Generate a Compose token layer from `colors.xml` (one canonical hex → semantic name), set `dynamicColor = false`, route both XML and Compose through the same names, then delete the duplicate Compose `private val`s. Collapse the ~100 names to the ~12 unique primitives + semantic aliases in the token JSON, keeping colorway groups intentional.
