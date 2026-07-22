# Template: New Persona

1. **Mint** the next `P#`.
2. Add an entry to canonical [/src/personas/personas.json](../src/personas/personas.json):
```json
{
  "id": "P#",
  "name": "<segment name>",
  "segmentSignal": "<what distinguishes them>",
  "inferredFrom": "<code signal, or 'UXR research <link>'>",
  "primaryDevices": ["HW-..."],
  "goals": "...",
  "frustrations": "...",
  "demographics": "...",
  "todo": "<open questions>"
}
```
3. Mirror the rationale row in [/memory/product/personas.md](../memory/product/personas.md).
4. Update anything that references personas by ID: [/memory/voice/tone-matrix.md](../memory/voice/tone-matrix.md), [/memory/analytics/monetization-map.md](../memory/analytics/monetization-map.md), device `targetPersonas` in [/src/hardware/devices.json](../src/hardware/devices.json), fixtures [/data/fixtures/entities/users.json](../data/fixtures/entities/users.json).

**Rule:** a persona must be backed by research or a clear code signal — mark inferred vs validated. No invented demographics.
