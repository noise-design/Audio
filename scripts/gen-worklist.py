#!/usr/bin/env python3
"""Regenerate MISSING-KEYS.md (per-locale translation backlog) from _catalog.json."""
import json, os
from collections import OrderedDict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cat = json.load(open(os.path.join(ROOT, 'src/i18n/_catalog.json')), object_pairs_hook=OrderedDict)
schema = json.load(open(os.path.join(ROOT, 'src/i18n/strings.schema.json')))
PARENT = schema['parentLocale']
CHILDREN = [lc for lc in schema['locales'] if lc != PARENT]
DOMAINS = schema['domains']
NAMES = schema['localeNames']

missing = {lc: [] for lc in CHILDREN}
for key, e in cat.items():
    dom = e['_meta']['domain']
    for lc in CHILDREN:
        if not e.get(lc):
            missing[lc].append((dom, key))

lines = ["# Noise Audio — Translation Worklist\n"]
lines.append(f"Parent locale **{PARENT}** defines **{len(cat)}** keys. This file lists the keys each")
lines.append("non-parent locale has NOT yet translated. Missing keys fall back to English at runtime,")
lines.append("so the app never breaks — but these are the strings to pick up next.\n")
lines.append("Regenerate with `python3 scripts/gen-worklist.py`.\n")

for lc in CHILDREN:
    ms = missing[lc]
    lines.append(f"\n## {NAMES.get(lc, lc)} — {len(ms)} keys to translate\n")
    if not ms:
        lines.append("Fully translated.\n"); continue
    bydom = OrderedDict((d, []) for d in DOMAINS)
    for dom, key in ms:
        bydom.setdefault(dom, []).append(key)
    for dom in DOMAINS:
        keys = bydom.get(dom, [])
        if not keys: continue
        lines.append(f"\n### `{dom}` ({len(keys)})\n")
        for key in keys:
            en = cat[key]['en'] or ''
            lines.append(f"- `{key.replace(chr(92)+'n','⏎')}` — EN: {en.replace(chr(92)+'n','⏎')}")
        lines.append("")

open(os.path.join(ROOT, 'MISSING-KEYS.md'), 'w', encoding='utf-8').write('\n'.join(lines))
print(f"MISSING-KEYS.md written: " + ", ".join(f"{lc}={len(missing[lc])}" for lc in CHILDREN))
