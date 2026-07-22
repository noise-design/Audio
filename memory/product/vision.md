# Product Vision

> ⚠️ **Stub.** No README, PRD, or product doc exists in-repo. The one-liner is derived from code/manifest/strings; everything below marked `TODO(product)` must be supplied by a human. A precise question is more valuable than a guessed answer.

## What it is (derived from code — trustworthy)
Noise Audio (`com.noise.audio`, v4.7.3) is the **Android companion app for Noise wireless audio devices**: TWS earbuds, open-wear buds, clip buds, and over-ear headphones built on Bestechnic/JL chip SDKs. It handles device pairing, battery/status, ANC & transparency, equalizer, touch/motion controls, firmware OTA, warranty, product guides, and a server-backed "Noise AI" voice/chat/transcription assistant.

Supported devices: see [/src/hardware/devices.json](../../src/hardware/devices.json). Feature set: see [/docs/index.md](../../docs/index.md).

## Mission / positioning — `TODO(product)`
- **Why does this app exist beyond a settings panel for the earbuds?** TODO(product).
- **Positioning vs competitors** (e.g. other TWS companion apps): TODO(product).
- **Role of Noise AI** in the product strategy (differentiator? experiment?): TODO(product) — note ADR-008 (Luna leftover) must be resolved first.

## Non-goals — `TODO(product)`
- Is fitness/health tracking in scope? (Heritage code references "NoiseFit"/"Luna ring" — see ADR-008/017 — but no fitness feature ships in this app.) TODO(product): confirm audio-only scope.

## Success metrics — `TODO(product)`
See [analytics/metrics-dictionary.md](../analytics/metrics-dictionary.md) for the events that exist; which are the north-star / guardrail metrics is TODO(product).

## Heritage note (evidence)
`app/build.gradle.kts:95` comments and the Room DB name `noisefit-audio-db` indicate this codebase was **forked from a Noise fitness app ("Luna"/"NoiseFit")**. Confirm intended product identity so leftover fitness concepts are purged (ADR-008, ADR-017).
