<script setup>
import { SearchX, RefreshCw } from 'lucide-vue-next'

defineProps({
  hasFilters: { type: Boolean, default: false },
})

const emit = defineEmits(['clear'])
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div class="w-16 h-16 rounded-2xl bg-smoke-100 dark:bg-smoke-800 flex items-center justify-center mb-4">
      <SearchX :size="28" class="text-smoke-400 dark:text-smoke-500" />
    </div>
    <h3 class="text-base font-semibold text-smoke-700 dark:text-smoke-300 mb-1">
      Δεν βρέθηκαν προϊόντα
    </h3>
    <p class="text-sm text-smoke-500 dark:text-smoke-400 max-w-xs">
      Δοκίμασε να αλλάξεις τα φίλτρα ή τον όρο αναζήτησης
    </p>
    <button
      v-if="hasFilters"
      @click="emit('clear')"
      class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-vapor-600 hover:bg-vapor-700 dark:bg-vapor-500 dark:hover:bg-vapor-600 text-white text-sm font-medium rounded-lg transition-colors"
      data-testid="button-clear-all"
    >
      <RefreshCw :size="14" />
      Καθαρισμός φίλτρων
    </button>
  </div>
</template>
