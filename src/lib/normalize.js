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
 * Multi-ingredient fuzzy match — checks if query characters can be found
 * across ingredients in any order. Each query char is consumed from the
 * first ingredient that still has it available (letter-pool approach).
 * e.g. "μηλκαν" matches ingredients ["κανέλα", "μήλο"] regardless of order.
 */
export function ingredientsFuzzyMatch(ingredients, query) {
  const normQuery = normalizeGreek(query).replace(/\s/g, '')
  if (!normQuery) return false

  // Build a letter pool: for each ingredient, track available characters
  const pools = ingredients.map(ing => {
    const chars = normalizeGreek(ing).replace(/\s/g, '').split('')
    return chars
  })

  // For each query character, find it in any pool and consume it
  for (const ch of normQuery) {
    let found = false
    for (const pool of pools) {
      const idx = pool.indexOf(ch)
      if (idx !== -1) {
        pool.splice(idx, 1) // consume the character
        found = true
        break
      }
    }
    if (!found) return false
  }
  return true
}
