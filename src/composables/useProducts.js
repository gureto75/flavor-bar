import { ref, computed, watch } from 'vue'
import { supabase } from '../lib/supabase.js'
import { sampleProducts } from '../lib/sampleData.js'

const products = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const usingSampleData = ref(false)

// Pagination
const ITEMS_PER_PAGE = 30
const currentPage = ref(1)

// Filter state
const filters = ref({
  profiles: [],
  volumes: [],
  ingredients: [],
  priceRange: [0, 50],
  iceIntensity: null,
  sweetnessIntensity: null,
})

// Navigation history for back functionality
const navigationHistory = ref([])

export function useProducts() {
  async function fetchProducts() {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('flavor_shots')
        .select('*')
        .order('name', { ascending: true })

      if (fetchError) throw fetchError

      if (data && data.length > 0) {
        products.value = data.map(p => ({
          ...p,
          ingredients: typeof p.ingredients === 'string' ? JSON.parse(p.ingredients) : (p.ingredients || []),
          price: parseFloat(p.price),
        }))
        usingSampleData.value = false
      } else {
        // No data in Supabase, use sample data
        products.value = sampleProducts
        usingSampleData.value = true
      }
    } catch (err) {
      console.warn('Supabase fetch failed, using sample data:', err.message)
      products.value = sampleProducts
      usingSampleData.value = true
      error.value = null // Don't show error, gracefully fallback
    } finally {
      loading.value = false
    }
  }

  // Derived filter options from data
  const availableProfiles = computed(() => {
    const profiles = [...new Set(products.value.map(p => p.flavor_profile))]
    return profiles.sort()
  })

  const availableVolumes = computed(() => {
    const volumes = [...new Set(products.value.map(p => p.final_volume))]
    return volumes.sort((a, b) => {
      const numA = parseInt(a)
      const numB = parseInt(b)
      return numA - numB
    })
  })

  const availableIngredients = computed(() => {
    const allIngredients = products.value.flatMap(p => p.ingredients || [])
    const unique = [...new Set(allIngredients)]
    return unique.sort()
  })

  const priceRange = computed(() => {
    if (products.value.length === 0) return [0, 50]
    const prices = products.value.map(p => p.price)
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))]
  })

  // Filtered and searched products
  const filteredProducts = computed(() => {
    let result = [...products.value]

    // Search filter - searches in name and ingredients
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      result = result.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(query)
        const ingredientMatch = (p.ingredients || []).some(i =>
          i.toLowerCase().includes(query)
        )
        const descMatch = p.description?.toLowerCase().includes(query)
        return nameMatch || ingredientMatch || descMatch
      })
    }

    // Profile filter
    if (filters.value.profiles.length > 0) {
      result = result.filter(p => filters.value.profiles.includes(p.flavor_profile))
    }

    // Volume filter
    if (filters.value.volumes.length > 0) {
      result = result.filter(p => filters.value.volumes.includes(p.final_volume))
    }

    // Ingredient filter
    if (filters.value.ingredients.length > 0) {
      result = result.filter(p =>
        filters.value.ingredients.some(ing =>
          (p.ingredients || []).includes(ing)
        )
      )
    }

    // Price range filter
    if (filters.value.priceRange) {
      result = result.filter(p =>
        p.price >= filters.value.priceRange[0] &&
        p.price <= filters.value.priceRange[1]
      )
    }

    // Ice intensity filter (maximum - show products with intensity <= selected value)
    if (filters.value.iceIntensity !== null) {
      result = result.filter(p => p.ice_intensity <= filters.value.iceIntensity)
    }

    // Sweetness intensity filter (maximum - show products with intensity <= selected value)
    if (filters.value.sweetnessIntensity !== null) {
      result = result.filter(p => p.sweetness_intensity <= filters.value.sweetnessIntensity)
    }

    return result
  })

  // Pagination
  const totalFilteredCount = computed(() => filteredProducts.value.length)

  const totalPages = computed(() => Math.max(1, Math.ceil(totalFilteredCount.value / ITEMS_PER_PAGE)))

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * ITEMS_PER_PAGE
    return filteredProducts.value.slice(start, start + ITEMS_PER_PAGE)
  })

  // Reset to page 1 when filters or search change
  watch([searchQuery, filters], () => {
    currentPage.value = 1
  }, { deep: true })

  function goToPage(page) {
    const p = Math.max(1, Math.min(page, totalPages.value))
    currentPage.value = p
    // Scroll to top of product grid
    document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const activeFilterCount = computed(() => {
    let count = 0
    if (filters.value.profiles.length > 0) count++
    if (filters.value.volumes.length > 0) count++
    if (filters.value.ingredients.length > 0) count++
    if (filters.value.iceIntensity !== null) count++
    if (filters.value.sweetnessIntensity !== null) count++
    const [min, max] = priceRange.value
    if (filters.value.priceRange[0] > min || filters.value.priceRange[1] < max) count++
    return count
  })

  function clearAllFilters() {
    filters.value = {
      profiles: [],
      volumes: [],
      ingredients: [],
      priceRange: [...priceRange.value],
      iceIntensity: null,
      sweetnessIntensity: null,
    }
    searchQuery.value = ''
  }

  function toggleProfile(profile) {
    const idx = filters.value.profiles.indexOf(profile)
    if (idx === -1) {
      filters.value.profiles.push(profile)
    } else {
      filters.value.profiles.splice(idx, 1)
    }
  }

  function toggleVolume(volume) {
    const idx = filters.value.volumes.indexOf(volume)
    if (idx === -1) {
      filters.value.volumes.push(volume)
    } else {
      filters.value.volumes.splice(idx, 1)
    }
  }

  function toggleIngredient(ingredient) {
    const idx = filters.value.ingredients.indexOf(ingredient)
    if (idx === -1) {
      filters.value.ingredients.push(ingredient)
    } else {
      filters.value.ingredients.splice(idx, 1)
    }
  }

  // Save current filter state to history
  function pushHistory() {
    navigationHistory.value.push({
      search: searchQuery.value,
      filters: JSON.parse(JSON.stringify(filters.value)),
    })
  }

  function goBack() {
    if (navigationHistory.value.length === 0) return false
    const prev = navigationHistory.value.pop()
    searchQuery.value = prev.search
    filters.value = prev.filters
    return true
  }

  const canGoBack = computed(() => navigationHistory.value.length > 0)

  return {
    products,
    loading,
    error,
    searchQuery,
    filters,
    usingSampleData,
    filteredProducts,
    availableProfiles,
    availableVolumes,
    availableIngredients,
    priceRange,
    activeFilterCount,
    fetchProducts,
    clearAllFilters,
    toggleProfile,
    toggleVolume,
    toggleIngredient,
    pushHistory,
    goBack,
    canGoBack,
    // Pagination
    currentPage,
    totalPages,
    totalFilteredCount,
    paginatedProducts,
    goToPage,
    ITEMS_PER_PAGE,
  }
}
