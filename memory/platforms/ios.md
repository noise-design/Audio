# Platform Ledger — iOS

**Owned & updated by:** the iOS team. **Same-PR rule:** any PR touching feature `F-X` on iOS updates [/src/platforms/parity.json](../../src/platforms/parity.json) in the same PR.

> ⚠️ **Stub — no evidence in this repo.** iOS is a separate codebase not present here. Every parity cell for iOS in `parity.json` is `unknown` until the iOS team fills this ledger.

## To fill (`TODO(ios team)`)
- Architecture (SwiftUI/UIKit, MVVM/TCA?), DI, networking stack.
- Which `F-*` are implemented / partial / missing vs the registry ([/docs/index.md](../../docs/index.md)) — update `parity.json`.
- Chip SDK story: is there an iOS equivalent of `besSdk`/`bes` for BES + JL? Which `HW-*` devices are supported?
- iOS-specific conventions, quirks, known gaps.
- Deviations from the shared spec → open ADRs in [../decisions.md](../decisions.md).

Shared contracts iOS must match: API ([../architecture/api-contracts.md](../architecture/api-contracts.md)), events ([/src/analytics/events.schema.json](../../src/analytics/events.schema.json)), i18n keys ([/src/i18n/strings.schema.json](../../src/i18n/strings.schema.json)), tokens ([/src/tokens/](../../src/tokens/)), devices ([/src/hardware/devices.json](../../src/hardware/devices.json)).
