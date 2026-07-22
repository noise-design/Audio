// Noise Audio — i18n runtime loader (reference implementation).
//
// Implements the resolution order documented in strings.schema.json:
//   locale -> key -> persona variant -> key.default -> en fallback -> literal key
//
// English (en) is the PARENT and the source of truth. Any locale may omit keys;
// they resolve against en automatically. No user-facing string should be
// hardcoded in a component — always go through t().

import locales from './locales.json' assert { type: 'json' };

// Eagerly import every domain file per locale. Bundlers (Vite/Metro/webpack)
// will code-split these; adjust the glob to your toolchain if needed.
const DOMAINS = [
  'common', 'onboarding', 'pairing', 'firmware', 'soundControl',
  'gestures', 'findMy', 'profile', 'settings', 'marketing', 'assistant', 'errors',
];

const PARENT = locales.parent; // "en"

// tables[locale][domain] = { key: { default, P1?, P2?, ... } }
const tables = {};
async function loadLocale(code) {
  if (tables[code]) return tables[code];
  const t = {};
  for (const dom of DOMAINS) {
    try {
      t[dom] = (await import(`./locales/${code}/${dom}.json`)).default;
    } catch {
      t[dom] = {}; // a locale may not have every domain file yet
    }
  }
  tables[code] = t;
  return t;
}

// Ensure parent is always available for fallback.
export async function initI18n(activeLocale = PARENT) {
  await loadLocale(PARENT);
  if (activeLocale !== PARENT) await loadLocale(activeLocale);
}

/**
 * Resolve a string.
 * @param {string} domain   e.g. "onboarding"
 * @param {string} key      the stable key (legacy iOS key or new dotted key)
 * @param {object} opts     { locale, persona, vars }
 * @returns {string}
 */
export function t(domain, key, opts = {}) {
  const locale = opts.locale || PARENT;
  const persona = opts.persona || null;

  const pick = (code) => {
    const entry = tables[code]?.[domain]?.[key];
    if (!entry) return undefined;
    if (persona && entry[persona] != null) return entry[persona]; // persona variant
    return entry.default;                                          // locale default
  };

  let out = pick(locale);
  if (out == null && locale !== PARENT) out = pick(PARENT); // parent fallback
  if (out == null) {
    // last-resort: return the key and log a missing-string error
    if (typeof console !== 'undefined') {
      console.error(`[i18n] missing string: ${locale}/${domain}.${key}`);
    }
    return key;
  }

  // simple {var} interpolation
  if (opts.vars) {
    out = out.replace(/\{(\w+)\}/g, (_, v) => (opts.vars[v] ?? `{${v}}`));
  }
  return out;
}

export { PARENT, DOMAINS, locales };
