<script setup>
import { computed } from 'vue'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  itemsPerPage: { type: Number, default: 30 },
})

const emit = defineEmits(['go-to-page'])

const startItem = computed(() => (props.currentPage - 1) * props.itemsPerPage + 1)
const endItem = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.totalItems))

// Generate visible page numbers with ellipsis
const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const pages = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  // Always show first page
  pages.push(1)

  if (current > 3) {
    pages.push('...')
  }

  // Pages around current
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push('...')
  }

  // Always show last page
  pages.push(total)

  return pages
})
</script>

<template>
  <div v-if="totalPages > 1" class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6" data-testid="pagination">
    <!-- Info -->
    <p class="text-xs text-smoke-500 dark:text-smoke-400 order-2 sm:order-1">
      {{ startItem }}–{{ endItem }} από {{ totalItems }} προϊόντα
    </p>

    <!-- Page buttons -->
    <div class="flex items-center gap-1 order-1 sm:order-2">
      <!-- First page -->
      <button
        @click="emit('go-to-page', 1)"
        :disabled="currentPage === 1"
        class="p-1.5 rounded-lg text-smoke-500 dark:text-smoke-400 hover:bg-smoke-100 dark:hover:bg-smoke-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Πρώτη σελίδα"
        data-testid="button-page-first"
      >
        <ChevronsLeft :size="16" />
      </button>

      <!-- Previous -->
      <button
        @click="emit('go-to-page', currentPage - 1)"
        :disabled="currentPage === 1"
        class="p-1.5 rounded-lg text-smoke-500 dark:text-smoke-400 hover:bg-smoke-100 dark:hover:bg-smoke-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Προηγούμενη σελίδα"
        data-testid="button-page-prev"
      >
        <ChevronLeft :size="16" />
      </button>

      <!-- Page numbers -->
      <template v-for="(page, idx) in visiblePages" :key="idx">
        <span
          v-if="page === '...'"
          class="w-8 h-8 flex items-center justify-center text-xs text-smoke-400 dark:text-smoke-500"
        >
          ...
        </span>
        <button
          v-else
          @click="emit('go-to-page', page)"
          :class="[
            'w-8 h-8 rounded-lg text-xs font-semibold transition-all',
            page === currentPage
              ? 'bg-vapor-600 text-white dark:bg-vapor-500 shadow-sm'
              : 'text-smoke-600 dark:text-smoke-400 hover:bg-smoke-100 dark:hover:bg-smoke-800'
          ]"
          :data-testid="`button-page-${page}`"
        >
          {{ page }}
        </button>
      </template>

      <!-- Next -->
      <button
        @click="emit('go-to-page', currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="p-1.5 rounded-lg text-smoke-500 dark:text-smoke-400 hover:bg-smoke-100 dark:hover:bg-smoke-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Επόμενη σελίδα"
        data-testid="button-page-next"
      >
        <ChevronRight :size="16" />
      </button>

      <!-- Last page -->
      <button
        @click="emit('go-to-page', totalPages)"
        :disabled="currentPage === totalPages"
        class="p-1.5 rounded-lg text-smoke-500 dark:text-smoke-400 hover:bg-smoke-100 dark:hover:bg-smoke-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Τελευταία σελίδα"
        data-testid="button-page-last"
      >
        <ChevronsRight :size="16" />
      </button>
    </div>
  </div>
</template>
