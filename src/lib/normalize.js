/**
 * Normalize Greek text for accent-insensitive search.
 * Removes diacritics (tonos) so ά=α, έ=ε, ή=η, ί=ι, ό=ο, ύ=υ, ώ=ω etc.
 * Also handles dialytika combinations (ΐ, ΰ).
 */
export function normalizeGreek(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/ς/g, 'σ')
}

/**
 * Accent-insensitive includes check.
 */
export function includesNormalized(text, query) {
  return normalizeGreek(text).includes(normalizeGreek(query))
}

/**
 * Subsequence match — checks if every character of `query` appears
 * in `text` in order (not necessarily contiguous).
 * e.g. "μηλκαν" matches "μήλο δημητριακά γάλα κανέλα"
 */
export function subsequenceMatch(text, query) {
  const normText = normalizeGreek(text)
  const normQuery = normalizeGreek(query)
  let ti = 0
  for (let qi = 0; qi < normQuery.length; qi++) {
    const ch = normQuery[qi]
    const found = normText.indexOf(ch, ti)
    if (found === -1) return false
    ti = found + 1
  }
  return true
}
