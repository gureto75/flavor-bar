<script setup>
import { useTheme } from '../composables/useTheme.js'
import { Sun, Moon, ArrowLeft } from 'lucide-vue-next'

const { isDark, toggleTheme } = useTheme()

defineProps({
  canGoBack: { type: Boolean, default: false },
})

const emit = defineEmits(['go-back'])
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-smoke-950/80 backdrop-blur-xl border-b border-smoke-200/50 dark:border-smoke-800/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-14">
        <!-- Left: Back button + Logo -->
        <div class="flex items-center gap-3">
          <button
            v-if="canGoBack"
            @click="emit('go-back')"
            class="flex items-center gap-1 px-2 py-1.5 -ml-2 rounded-lg text-sm text-smoke-600 dark:text-smoke-400 hover:bg-smoke-100 dark:hover:bg-smoke-800 transition-colors"
            data-testid="button-go-back"
          >
            <ArrowLeft :size="16" />
            <span class="hidden sm:inline">Πίσω</span>
          </button>

          <!-- Logo -->
          <div class="flex items-center gap-2.5">
            <svg class="w-7 h-7 text-vapor-600 dark:text-vapor-400" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Flavor Bar Logo">
              <rect x="3" y="8" width="26" height="18" rx="4" stroke="currentColor" stroke-width="2"/>
              <path d="M10 8V5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <circle cx="10" cy="17" r="2" fill="currentColor" opacity="0.3"/>
              <circle cx="16" cy="17" r="2" fill="currentColor" opacity="0.5"/>
              <circle cx="22" cy="17" r="2" fill="currentColor" opacity="0.7"/>
              <path d="M8 3.5c0 0 1-2 3-1.5" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.3"/>
              <path d="M15 2c0 0 0.5-1.5 2-1" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.2"/>
            </svg>
            <div>
              <h1 class="text-base font-bold text-smoke-900 dark:text-smoke-100 leading-none tracking-tight">
                Flavor Bar
              </h1>
              <p class="text-[10px] text-smoke-400 dark:text-smoke-500 font-medium tracking-wider uppercase mt-0.5">
                VaporStation &middot; Εν Ατμώ
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Theme toggle -->
        <button
          @click="toggleTheme"
          class="p-2 rounded-lg text-smoke-500 dark:text-smoke-400 hover:bg-smoke-100 dark:hover:bg-smoke-800 transition-colors"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          data-testid="button-theme-toggle"
        >
          <Moon v-if="!isDark" :size="18" />
          <Sun v-else :size="18" />
        </button>
      </div>
    </div>
  </header>
</template>
