#!/usr/bin/env python3
"""
i18n gate for Noise Audio. Run before every commit that touches locale files.

Checks:
  1. Valid JSON in every locale file.
  2. Parent (en) defines every key that any child locale uses (no orphan keys).
  3. Every key object has a `default`.
  4. Reports per-locale coverage vs the parent and lists missing keys.
  5. Warns on remaining `_todo` English strings (slug keys awaiting owner copy).

Exit non-zero if any hard check (1-3) fails. Coverage gaps + _todo are warnings.
"""
import json, os, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOC = os.path.join(ROOT, 'src/i18n/locales')
schema = json.load(open(os.path.join(ROOT, 'src/i18n/strings.schema.json')))
PARENT = schema['parentLocale']
LOCALES = schema['locales']
DOMAINS = schema['domains']

errors, warnings = [], []

def load(lc, dom):
    p = os.path.join(LOC, lc, f'{dom}.json')
    if not os.path.exists(p):
        return None
    try:
        return json.load(open(p, encoding='utf-8'))
    except json.JSONDecodeError as e:
        errors.append(f'[JSON] {lc}/{dom}.json: {e}')
        return {}

# load parent
parent = {}
for dom in DOMAINS:
    obj = load(PARENT, dom) or {}
    for k, v in obj.items():
        if 'default' not in v:
            errors.append(f'[SHAPE] {PARENT}/{dom}.json key "{k}" missing "default"')
        parent[(dom, k)] = v

# check children
coverage = {}
for lc in LOCALES:
    if lc == PARENT:
        coverage[lc] = (len(parent), len(parent), [])
        continue
    have = 0; missing = []
    child_keys = set()
    for dom in DOMAINS:
        obj = load(lc, dom)
        if obj is None:
            continue
        for k, v in obj.items():
            child_keys.add((dom, k))
            if 'default' not in v:
                errors.append(f'[SHAPE] {lc}/{dom}.json key "{k}" missing "default"')
            if (dom, k) not in parent:
                errors.append(f'[ORPHAN] {lc}/{dom}.json key "{k}" not defined in parent {PARENT}/{dom}.json')
    for pk in parent:
        if pk in child_keys:
            have += 1
        else:
            missing.append(pk)
    coverage[lc] = (have, len(parent), missing)

# count _todo in parent
todos = [(dom, k) for (dom, k), v in parent.items() if '_todo' in v]
if todos:
    warnings.append(f'{len(todos)} English keys still auto-humanized (awaiting owner confirmation) — see _todo markers.')

print("=" * 60)
print("Noise Audio i18n check")
print("=" * 60)
print(f"Parent locale : {PARENT}  ({len(parent)} keys)")
print("Coverage:")
for lc in LOCALES:
    have, total, missing = coverage[lc]
    pct = 100 * have / total if total else 0
    tag = "  (parent)" if lc == PARENT else ""
    print(f"  {lc:4s} {have:4d}/{total} = {pct:5.1f}%{tag}")

if warnings:
    print("\nWARNINGS:")
    for w in warnings:
        print("  -", w)

if errors:
    print(f"\nERRORS ({len(errors)}):")
    for e in errors[:50]:
        print("  -", e)
    print("\nFAIL")
    sys.exit(1)

print("\nPASS (hard checks). Coverage gaps fall back to parent at runtime.")
