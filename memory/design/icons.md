# Icons & Drawables

`TODO(design)`: full icon inventory. Facts from recon:

- Drawables live in `app/src/main/res/drawable*` (density buckets + `drawable-ldrtl-*` for RTL mirroring — good, supports Arabic/Hebrew locales).
- Vector drawables enabled (`vectorDrawables.useSupportLibrary = true`).
- App launcher icons: `mipmap-*` + adaptive `mipmap-anydpi-v26` + `ic_launcher_background.xml`.
- Fonts (icon-adjacent): `res/font/` Clash Display + Roboto Mono (see [tokens.md](tokens.md)).
- Lottie animations used (dependency present) — check `res/raw/` for `.json` Lottie assets.
- Product-guide / walkthrough imagery is asset-heavy (recent commits: "alt series - asset update", "alt buds walkthrough images").

## TODO(design)
- Enumerate the icon set, naming convention, and which are per-`HW-*` (device renders) vs generic.
- Confirm RTL mirroring coverage for all directional icons.
- Establish an icon token/naming rule if one is desired (currently none — raw drawable names).
