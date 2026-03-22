<script setup>
import IntensityBar from './IntensityBar.vue'
import { ExternalLink, Droplets, Candy, FlaskConical, Tag } from 'lucide-vue-next'

const props = defineProps({
  product: { type: Object, required: true },
})

const profileColors = {
  'Φρούτα': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Μέντα': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Καπνικά': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  'Κρέμες': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Ροφήματα': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
}

const profileEmoji = {
  'Φρούτα': '🍊',
  'Μέντα': '🌿',
  'Καπνικά': '🍂',
  'Κρέμες': '🍦',
  'Ροφήματα': '☕',
}

function getProfileClass(profile) {
  return profileColors[profile] || 'bg-smoke-100 text-smoke-700 dark:bg-smoke-800 dark:text-smoke-300'
}

function getProfileEmoji(profile) {
  return profileEmoji[profile] || '💨'
}

function fallbackImage(e) {
  e.target.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23e4e4e4"/><text x="200" y="200" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="48" fill="%238a8a8a">💨</text></svg>`)
}
</script>

<template>
  <article
    class="product-card group bg-white dark:bg-smoke-900 rounded-xl border border-smoke-200 dark:border-smoke-800 overflow-hidden shadow-sm hover:shadow-md dark:shadow-none"
    :data-testid="`card-product-${product.id}`"
  >
    <!-- Image -->
    <div class="relative aspect-[4/3] overflow-hidden bg-smoke-100 dark:bg-smoke-800">
      <img
        :src="product.image_url"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        @error="fallbackImage"
      />
      <!-- Price badge -->
      <div class="absolute top-3 right-3 bg-white/90 dark:bg-smoke-900/90 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm">
        <span class="text-sm font-bold text-vapor-600 dark:text-vapor-400">€{{ product.price.toFixed(2) }}</span>
      </div>
      <!-- Profile badge -->
      <div class="absolute top-3 left-3">
        <span
          :class="getProfileClass(product.flavor_profile)"
          class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm"
        >
          <span>{{ getProfileEmoji(product.flavor_profile) }}</span>
          {{ product.flavor_profile }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 space-y-3">
      <!-- Name & Volume -->
      <div>
        <h3 class="text-base font-bold text-smoke-900 dark:text-smoke-100 leading-tight">
          {{ product.name }}
        </h3>
        <div class="flex items-center gap-2 mt-1">
          <span class="inline-flex items-center gap-1 text-xs text-smoke-500 dark:text-smoke-400">
            <FlaskConical :size="12" />
            {{ product.final_volume }}
          </span>
        </div>
      </div>

      <!-- Description -->
      <p class="text-sm text-smoke-600 dark:text-smoke-400 leading-relaxed line-clamp-2">
        {{ product.description }}
      </p>

      <!-- Ingredients -->
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="ingredient in product.ingredients"
          :key="ingredient"
          class="inline-flex items-center px-2 py-0.5 rounded-md bg-smoke-100 dark:bg-smoke-800 text-xs text-smoke-600 dark:text-smoke-400 font-medium"
        >
          {{ ingredient }}
        </span>
      </div>

      <!-- Intensity Bars -->
      <div class="space-y-1.5 pt-1">
        <IntensityBar :value="product.ice_intensity" :max="5" color="ice" label="Πάγος" />
        <IntensityBar :value="product.sweetness_intensity" :max="5" color="sweet" label="Γλυκύτητα" />
      </div>

      <!-- CTA -->
      <a
        v-if="product.product_url"
        :href="product.product_url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center gap-2 w-full mt-2 px-4 py-2.5 bg-vapor-600 hover:bg-vapor-700 dark:bg-vapor-500 dark:hover:bg-vapor-600 text-white text-sm font-semibold rounded-lg transition-colors"
        :data-testid="`link-product-${product.id}`"
      >
        Δες το στο e-shop
        <ExternalLink :size="14" />
      </a>
    </div>
  </article>
</template>
