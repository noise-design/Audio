# PRD — F-ANC: Noise control (ANC / Transparency)

**Status:** stub. **Owning screen:** `ancFragment` (+ Home noise-control card). Capability: `DeviceFeatures.ANC`. Support per device: [feature-map.json](../../../src/hardware/feature-map.json) (`F-ANC`, mostly TODO(verify)).

## Summary
Switch between ANC modes (Off / Transparency / ANC) and adjust ANC level on supported devices.

## Declares (acceptance criteria)
- **AC-1 ✓** Home exposes ANC Off / Transparency / ANC (`home_anc_off_click`, `home_anc_transparent_click`, `home_anc_anc_click` — stutter naming, ADR-011).
- **AC-2 ✓** ANC level selection is tracked with `anc_level` prop (`home_anc_level_selected`).
- **AC-3 ✓** Strings: `active_noise_cancellation` ("NOISE CONTROL"), `text_transparency`, `text_noise_cancel` ("ANC").
- **AC-4 ✓** Adaptive-ANC gated by model (`HomeCardSelector.isAdaptiveAnc() :176-177`) — should be capability-driven (ADR-002).
- **AC-5 TODO(verify)** Which `HW-*` support ANC / adaptive-ANC / how many levels — confirm against `AudioSDK` resolvers.
- **AC-6 TODO(product)** ANC level count and labels per device; open-wear (`HW-ALT-OWS`) expected unsupported.

## States
Must handle device disconnected/reconnecting (ANC control unavailable) — see [../../../memory/design/flows.md](../../../memory/design/flows.md).
