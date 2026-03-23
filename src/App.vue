<script setup>
import { onMounted, watch } from 'vue'
import { useProducts } from './composables/useProducts.js'
import AppHeader from './components/AppHeader.vue'
import SearchBar from './components/SearchBar.vue'
import FilterPanel from './components/FilterPanel.vue'
import ProductCard from './components/ProductCard.vue'
import EmptyState from './components/EmptyState.vue'
import LoadingSkeleton from './components/LoadingSkeleton.vue'
import PaginationBar from './components/PaginationBar.vue'

const {
  products,
  loading,
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
} = useProducts()

onMounted(() => {
  fetchProducts()
})

// When price range from data changes, update filter defaults
watch(priceRange, (newRange) => {
  if (filters.value.priceRange[0] === 0 && filters.value.priceRange[1] === 50) {
    filters.value.priceRange = [...newRange]
  }
}, { immediate: true })

function updatePrice(range) {
  filters.value.priceRange = range
}

function updateIce(val) {
  filters.value.iceIntensity = val
}

function updateSweetness(val) {
  filters.value.sweetnessIntensity = val
}

function handleFilterChanged() {
  pushHistory()
}

function handleGoBack() {
  goBack()
}
</script>

<template>
  <div class="min-h-screen bg-smoke-50 dark:bg-smoke-950 transition-colors">
    <AppHeader :canGoBack="canGoBack" @go-back="handleGoBack" />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <!-- Demo notice -->
      <div
        v-if="usingSampleData && !loading"
        class="mb-4 px-4 py-2.5 bg-vapor-50 dark:bg-vapor-900/20 border border-vapor-200 dark:border-vapor-800 rounded-xl text-xs text-vapor-700 dark:text-vapor-400"
      >
        Αυτά είναι demo προϊόντα. Συνδέστε τη Supabase βάση για πραγματικά δεδομένα.
      </div>

      <!-- Search -->
      <div class="mb-5">
        <SearchBar
          v-model="searchQuery"
          :resultCount="totalFilteredCount"
          :totalCount="products.length"
          @update:modelValue="pushHistory"
        />
      </div>

      <!-- Layout: Filters + Products -->
      <div class="flex flex-col lg:flex-row gap-5">
        <!-- Sidebar Filters -->
        <aside class="lg:w-64 lg:shrink-0">
          <div class="lg:sticky lg:top-20">
            <FilterPanel
              :filters="filters"
              :availableProfiles="availableProfiles"
              :availableVolumes="availableVolumes"
              :availableIngredients="availableIngredients"
              :priceRange="priceRange"
              :activeFilterCount="activeFilterCount"
              @toggle-profile="toggleProfile"
              @toggle-volume="toggleVolume"
              @toggle-ingredient="toggleIngredient"
              @update-price="updatePrice"
              @update-ice="updateIce"
              @update-sweetness="updateSweetness"
              @clear-all="clearAllFilters"
              @filter-changed="handleFilterChanged"
            />
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="flex-1 min-w-0" id="product-grid">
          <!-- Results count -->
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm text-smoke-500 dark:text-smoke-400">
              <span class="font-semibold text-smoke-700 dark:text-smoke-300">{{ totalFilteredCount }}</span>
              {{ totalFilteredCount === 1 ? 'προϊόν' : 'προϊόντα' }}
              <span v-if="totalPages > 1" class="text-smoke-400 dark:text-smoke-500">
                &middot; Σελίδα {{ currentPage }} από {{ totalPages }}
              </span>
            </p>
          </div>

          <!-- Loading -->
          <LoadingSkeleton v-if="loading" />

          <!-- Empty State -->
          <EmptyState
            v-else-if="totalFilteredCount === 0"
            :hasFilters="activeFilterCount > 0 || searchQuery.length > 0"
            @clear="clearAllFilters"
          />

          <!-- Product Grid -->
          <template v-else>
            <TransitionGroup
              tag="div"
              name="slide"
              class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              <ProductCard
                v-for="product in paginatedProducts"
                :key="product.id"
                :product="product"
              />
            </TransitionGroup>

            <!-- Pagination -->
            <PaginationBar
              :currentPage="currentPage"
              :totalPages="totalPages"
              :totalItems="totalFilteredCount"
              :itemsPerPage="ITEMS_PER_PAGE"
              @go-to-page="goToPage"
            />
          </template>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-12 py-6 border-t border-smoke-200 dark:border-smoke-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-smoke-400 dark:text-smoke-500">
          &copy; {{ new Date().getFullYear() }} VaporStation &middot; Εν Ατμώ. Flavor Bar
        </p>
        <a
          href="https://www.perplexity.ai/computer"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs text-smoke-400 dark:text-smoke-500 hover:text-smoke-600 dark:hover:text-smoke-300 transition-colors"
        >
          Created with Perplexity Computer
        </a>
      </div>
    </footer>
  </div>
</template>
