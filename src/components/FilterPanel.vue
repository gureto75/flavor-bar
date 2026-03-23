<script setup>
import { ref, computed, watch } from 'vue'
import { SlidersHorizontal, X, ChevronDown, ChevronUp, Snowflake, Candy, Globe, Building2 } from 'lucide-vue-next'

const props = defineProps({
  filters: { type: Object, required: true },
  availableProfiles: { type: Array, default: () => [] },
  availableVolumes: { type: Array, default: () => [] },
  availableIngredients: { type: Array, default: () => [] },
  availableCountries: { type: Array, default: () => [] },
  availableBrands: { type: Array, default: () => [] },
  priceRange: { type: Array, default: () => [0, 50] },
  activeFilterCount: { type: Number, default: 0 },
})

const emit = defineEmits([
  'toggle-profile',
  'toggle-volume',
  'toggle-ingredient',
  'toggle-country',
  'toggle-brand',
  'update-price',
  'update-ice',
  'update-sweetness',
  'clear-all',
  'filter-changed',
])

const isOpen = ref(false)
const expandedSections = ref({
  profile: true,
  volume: true,
  country: true,
  brand: true,
  ingredients: false,
  price: true,
  intensity: true,
})

function toggleSection(section) {
  expandedSections.value[section] = !expandedSections.value[section]
}

const profileEmoji = {
  'Φρούτα': '🍊',
  'Μέντα': '🌿',
  'Καπνικά': '🍂',
  'Κρέμες': '🍦',
  'Ροφήματα': '☕',
}

function handleToggleProfile(profile) {
  emit('toggle-profile', profile)
  emit('filter-changed')
}

function handleToggleVolume(volume) {
  emit('toggle-volume', volume)
  emit('filter-changed')
}

function handleToggleIngredient(ingredient) {
  emit('toggle-ingredient', ingredient)
  emit('filter-changed')
}

function handleToggleCountry(country) {
  emit('toggle-country', country)
  emit('filter-changed')
}

function handleToggleBrand(brand) {
  emit('toggle-brand', brand)
  emit('filter-changed')
}

function handlePriceChange(e, bound) {
  const val = parseFloat(e.target.value)
  const newRange = [...props.filters.priceRange]
  newRange[bound] = val
  emit('update-price', newRange)
  emit('filter-changed')
}

function handleIceChange(val) {
  emit('update-ice', val === props.filters.iceIntensity ? null : val)
  emit('filter-changed')
}

function handleSweetnessChange(val) {
  emit('update-sweetness', val === props.filters.sweetnessIntensity ? null : val)
  emit('filter-changed')
}
</script>

<template>
  <!-- Mobile toggle -->
  <button
    @click="isOpen = !isOpen"
    class="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-smoke-900 border border-smoke-200 dark:border-smoke-700 rounded-xl text-sm font-medium text-smoke-700 dark:text-smoke-300 hover:bg-smoke-50 dark:hover:bg-smoke-800 transition-colors w-full justify-center"
    data-testid="button-toggle-filters"
  >
    <SlidersHorizontal :size="16" />
    Φίλτρα
    <span
      v-if="activeFilterCount > 0"
      class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-vapor-600 text-white text-xs font-bold"
    >
      {{ activeFilterCount }}
    </span>
  </button>

  <!-- Filter panel -->
  <div
    :class="[
      'lg:block',
      isOpen ? 'block' : 'hidden',
    ]"
  >
    <div class="bg-white dark:bg-smoke-900 border border-smoke-200 dark:border-smoke-700 rounded-xl p-4 space-y-4">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-bold text-smoke-900 dark:text-smoke-100 flex items-center gap-2">
          <SlidersHorizontal :size="16" />
          Φίλτρα
        </h2>
        <button
          v-if="activeFilterCount > 0"
          @click="emit('clear-all')"
          class="text-xs text-vapor-600 dark:text-vapor-400 hover:underline font-medium"
          data-testid="button-clear-filters"
        >
          Καθαρισμός
        </button>
      </div>

      <!-- Flavor Profile -->
      <div>
        <button
          @click="toggleSection('profile')"
          class="flex items-center justify-between w-full py-1 text-xs font-semibold text-smoke-500 dark:text-smoke-400 uppercase tracking-wider"
        >
          Γευστικό Προφίλ
          <component :is="expandedSections.profile ? ChevronUp : ChevronDown" :size="14" />
        </button>
        <div v-if="expandedSections.profile" class="mt-2 flex flex-wrap gap-1.5">
          <button
            v-for="profile in availableProfiles"
            :key="profile"
            @click="handleToggleProfile(profile)"
            :class="[
              'px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all',
              filters.profiles.includes(profile)
                ? 'bg-vapor-600 text-white dark:bg-vapor-500 shadow-sm'
                : 'bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400 hover:bg-smoke-200 dark:hover:bg-smoke-700'
            ]"
            :data-testid="`filter-profile-${profile}`"
          >
            {{ profileEmoji[profile] || '💨' }} {{ profile }}
          </button>
        </div>
      </div>

      <!-- Volume -->
      <div>
        <button
          @click="toggleSection('volume')"
          class="flex items-center justify-between w-full py-1 text-xs font-semibold text-smoke-500 dark:text-smoke-400 uppercase tracking-wider"
        >
          Τελικός Όγκος
          <component :is="expandedSections.volume ? ChevronUp : ChevronDown" :size="14" />
        </button>
        <div v-if="expandedSections.volume" class="mt-2 flex flex-wrap gap-1.5">
          <button
            v-for="volume in availableVolumes"
            :key="volume"
            @click="handleToggleVolume(volume)"
            :class="[
              'px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all',
              filters.volumes.includes(volume)
                ? 'bg-vapor-600 text-white dark:bg-vapor-500 shadow-sm'
                : 'bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400 hover:bg-smoke-200 dark:hover:bg-smoke-700'
            ]"
            :data-testid="`filter-volume-${volume}`"
          >
            {{ volume }}
          </button>
        </div>
      </div>

      <!-- Price Range -->
      <div>
        <button
          @click="toggleSection('price')"
          class="flex items-center justify-between w-full py-1 text-xs font-semibold text-smoke-500 dark:text-smoke-400 uppercase tracking-wider"
        >
          Τιμή
          <component :is="expandedSections.price ? ChevronUp : ChevronDown" :size="14" />
        </button>
        <div v-if="expandedSections.price" class="mt-3 space-y-2">
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <label class="text-xs text-smoke-500 dark:text-smoke-400">Από</label>
              <input
                type="number"
                :value="filters.priceRange[0]"
                :min="priceRange[0]"
                :max="filters.priceRange[1]"
                step="0.5"
                @input="handlePriceChange($event, 0)"
                class="w-full mt-0.5 px-2 py-1.5 bg-smoke-50 dark:bg-smoke-800 border border-smoke-200 dark:border-smoke-700 rounded-lg text-xs text-smoke-900 dark:text-smoke-100 focus:outline-none focus:ring-1 focus:ring-vapor-500"
                data-testid="input-price-min"
              />
            </div>
            <span class="text-smoke-400 mt-4">—</span>
            <div class="flex-1">
              <label class="text-xs text-smoke-500 dark:text-smoke-400">Έως</label>
              <input
                type="number"
                :value="filters.priceRange[1]"
                :min="filters.priceRange[0]"
                :max="priceRange[1]"
                step="0.5"
                @input="handlePriceChange($event, 1)"
                class="w-full mt-0.5 px-2 py-1.5 bg-smoke-50 dark:bg-smoke-800 border border-smoke-200 dark:border-smoke-700 rounded-lg text-xs text-smoke-900 dark:text-smoke-100 focus:outline-none focus:ring-1 focus:ring-vapor-500"
                data-testid="input-price-max"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Country -->
      <div>
        <button
          @click="toggleSection('country')"
          class="flex items-center justify-between w-full py-1 text-xs font-semibold text-smoke-500 dark:text-smoke-400 uppercase tracking-wider"
        >
          <span class="flex items-center gap-1.5">
            <Globe :size="13" class="text-emerald-500" />
            Χώρα Προέλευσης
          </span>
          <component :is="expandedSections.country ? ChevronUp : ChevronDown" :size="14" />
        </button>
        <div v-if="expandedSections.country" class="mt-2 flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
          <button
            v-for="country in availableCountries"
            :key="country"
            @click="handleToggleCountry(country)"
            :class="[
              'px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all',
              filters.countries.includes(country)
                ? 'bg-vapor-600 text-white dark:bg-vapor-500 shadow-sm'
                : 'bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400 hover:bg-smoke-200 dark:hover:bg-smoke-700'
            ]"
            :data-testid="`filter-country-${country}`"
          >
            {{ country }}
          </button>
        </div>
      </div>

      <!-- Brand -->
      <div>
        <button
          @click="toggleSection('brand')"
          class="flex items-center justify-between w-full py-1 text-xs font-semibold text-smoke-500 dark:text-smoke-400 uppercase tracking-wider"
        >
          <span class="flex items-center gap-1.5">
            <Building2 :size="13" class="text-indigo-500" />
            Εταιρεία (Brand)
          </span>
          <component :is="expandedSections.brand ? ChevronUp : ChevronDown" :size="14" />
        </button>
        <div v-if="expandedSections.brand" class="mt-2 flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
          <button
            v-for="brand in availableBrands"
            :key="brand"
            @click="handleToggleBrand(brand)"
            :class="[
              'px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all',
              filters.brands.includes(brand)
                ? 'bg-vapor-600 text-white dark:bg-vapor-500 shadow-sm'
                : 'bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400 hover:bg-smoke-200 dark:hover:bg-smoke-700'
            ]"
            :data-testid="`filter-brand-${brand}`"
          >
            {{ brand }}
          </button>
        </div>
      </div>

      <!-- Ingredients -->
      <div>
        <button
          @click="toggleSection('ingredients')"
          class="flex items-center justify-between w-full py-1 text-xs font-semibold text-smoke-500 dark:text-smoke-400 uppercase tracking-wider"
        >
          Συστατικά
          <component :is="expandedSections.ingredients ? ChevronUp : ChevronDown" :size="14" />
        </button>
        <div v-if="expandedSections.ingredients" class="mt-2 flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
          <button
            v-for="ingredient in availableIngredients"
            :key="ingredient"
            @click="handleToggleIngredient(ingredient)"
            :class="[
              'px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all',
              filters.ingredients.includes(ingredient)
                ? 'bg-vapor-600 text-white dark:bg-vapor-500 shadow-sm'
                : 'bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400 hover:bg-smoke-200 dark:hover:bg-smoke-700'
            ]"
            :data-testid="`filter-ingredient-${ingredient}`"
          >
            {{ ingredient }}
          </button>
        </div>
      </div>

      <!-- Intensity Filters -->
      <div>
        <button
          @click="toggleSection('intensity')"
          class="flex items-center justify-between w-full py-1 text-xs font-semibold text-smoke-500 dark:text-smoke-400 uppercase tracking-wider"
        >
          Ένταση
          <component :is="expandedSections.intensity ? ChevronUp : ChevronDown" :size="14" />
        </button>
        <div v-if="expandedSections.intensity" class="mt-3 space-y-3">
          <!-- Ice Intensity -->
          <div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <Snowflake :size="13" class="text-sky-500" />
              <span class="text-xs font-medium text-smoke-600 dark:text-smoke-400">Πάγος (μέγ.)</span>
            </div>
            <div class="flex gap-1">
              <button
                v-for="i in 6"
                :key="'ice-' + (i - 1)"
                @click="handleIceChange(i - 1)"
                :class="[
                  'flex-1 h-7 rounded-md text-xs font-semibold transition-all',
                  filters.iceIntensity === (i - 1)
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-smoke-100 dark:bg-smoke-800 text-smoke-500 dark:text-smoke-400 hover:bg-sky-100 dark:hover:bg-sky-900/30'
                ]"
                :data-testid="`filter-ice-${i - 1}`"
              >
                {{ i - 1 }}
              </button>
            </div>
          </div>

          <!-- Sweetness Intensity -->
          <div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <Candy :size="13" class="text-amber-500" />
              <span class="text-xs font-medium text-smoke-600 dark:text-smoke-400">Γλυκύτητα (μέγ.)</span>
            </div>
            <div class="flex gap-1">
              <button
                v-for="i in 6"
                :key="'sweet-' + (i - 1)"
                @click="handleSweetnessChange(i - 1)"
                :class="[
                  'flex-1 h-7 rounded-md text-xs font-semibold transition-all',
                  filters.sweetnessIntensity === (i - 1)
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-smoke-100 dark:bg-smoke-800 text-smoke-500 dark:text-smoke-400 hover:bg-amber-100 dark:hover:bg-amber-900/30'
                ]"
                :data-testid="`filter-sweetness-${i - 1}`"
              >
                {{ i - 1 }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
