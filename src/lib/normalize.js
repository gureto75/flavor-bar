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

