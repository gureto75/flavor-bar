<script setup>
import { Search, X } from 'lucide-vue-next'

const props = defineProps({
  modelValue: { type: String, default: '' },
  resultCount: { type: Number, default: 0 },
  totalCount: { type: Number, default: 0 },
})

const emit = defineEmits(['update:modelValue'])

function clear() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="relative">
    <div class="relative">
      <Search
        :size="18"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-smoke-400 dark:text-smoke-500 pointer-events-none"
      />
      <input
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        type="text"
        placeholder="Αναζήτηση με όνομα ή συστατικό..."
        class="w-full pl-11 pr-20 py-3 bg-white dark:bg-smoke-900 border border-smoke-200 dark:border-smoke-700 rounded-xl text-sm text-smoke-900 dark:text-smoke-100 placeholder-smoke-400 dark:placeholder-smoke-600 focus:outline-none focus:ring-2 focus:ring-vapor-500/40 focus:border-vapor-500 dark:focus:ring-vapor-400/40 dark:focus:border-vapor-400 transition-all"
        data-testid="input-search"
      />
      <button
        v-if="modelValue"
        @click="clear"
        class="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-smoke-100 dark:hover:bg-smoke-800 text-smoke-400 dark:text-smoke-500 transition-colors"
        data-testid="button-clear-search"
      >
        <X :size="16" />
      </button>
    </div>
    <div v-if="modelValue" class="mt-2 text-xs text-smoke-500 dark:text-smoke-400 pl-1">
      {{ resultCount }} {{ resultCount === 1 ? 'αποτέλεσμα' : 'αποτελέσματα' }} από {{ totalCount }}
    </div>
  </div>
</template>
