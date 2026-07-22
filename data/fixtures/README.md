# Shared Canonical Fixtures

Cross-feature test fixtures. **Scenario-specific fixtures stay per-feature** (next to the feature's tests); only shared canonical entities live here.

- [entities/users.json](entities/users.json) — one user per persona `P1..P5`.
- [entities/devices.json](entities/devices.json) — one device per `HW-*` model.

Shapes mirror the canonical models in [/memory/architecture/data-models.md](../../architecture/data-models.md). IDs cross-reference personas ([/src/personas/personas.json](../../src/personas/personas.json)) and devices ([/src/hardware/devices.json](../../src/hardware/devices.json)).

## Provenance
The repo's existing test dirs (`app/src/test`, `app/src/androidTest`) currently hold only template `ExampleUnitTest`/`ExampleInstrumentedTest` plus one real unit test (`TranscriptionTimerThresholdTest`). These fixtures are **new** (no rich fixtures existed to derive from) — placeholder addresses/firmware; `TODO(qa)` to add firmware-variant fixtures where device behavior diverges (e.g. JL OTA, ADR-016).
