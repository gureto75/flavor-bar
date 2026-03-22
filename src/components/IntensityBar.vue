<script setup>
const props = defineProps({
  value: { type: Number, required: true },
  max: { type: Number, default: 5 },
  color: { type: String, default: 'vapor' },
  label: { type: String, default: '' },
})

const percentage = Math.round((props.value / props.max) * 100)
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="text-xs text-smoke-500 dark:text-smoke-400 w-20 shrink-0 font-medium">{{ label }}</span>
    <div class="flex-1 flex items-center gap-1">
      <div
        v-for="i in max"
        :key="i"
        class="h-1.5 flex-1 rounded-full transition-colors duration-300"
        :class="i <= value
          ? (color === 'ice'
            ? 'bg-sky-400 dark:bg-sky-500'
            : 'bg-amber-400 dark:bg-amber-500')
          : 'bg-smoke-200 dark:bg-smoke-700'"
      />
    </div>
    <span class="text-xs text-smoke-400 dark:text-smoke-500 w-6 text-right tabular-nums">{{ value }}/{{ max }}</span>
  </div>
</template>
