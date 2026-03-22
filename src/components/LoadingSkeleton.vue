<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="i in 6"
      :key="i"
      class="bg-white dark:bg-smoke-900 rounded-xl border border-smoke-200 dark:border-smoke-800 overflow-hidden animate-pulse"
    >
      <div class="aspect-[4/3] bg-smoke-200 dark:bg-smoke-800" />
      <div class="p-4 space-y-3">
        <div class="h-4 bg-smoke-200 dark:bg-smoke-800 rounded w-3/4" />
        <div class="h-3 bg-smoke-200 dark:bg-smoke-800 rounded w-1/4" />
        <div class="space-y-1.5">
          <div class="h-3 bg-smoke-200 dark:bg-smoke-800 rounded w-full" />
          <div class="h-3 bg-smoke-200 dark:bg-smoke-800 rounded w-2/3" />
        </div>
        <div class="flex gap-1.5">
          <div class="h-5 bg-smoke-200 dark:bg-smoke-800 rounded w-14" />
          <div class="h-5 bg-smoke-200 dark:bg-smoke-800 rounded w-16" />
          <div class="h-5 bg-smoke-200 dark:bg-smoke-800 rounded w-12" />
        </div>
        <div class="space-y-1">
          <div class="h-2 bg-smoke-200 dark:bg-smoke-800 rounded w-full" />
          <div class="h-2 bg-smoke-200 dark:bg-smoke-800 rounded w-full" />
        </div>
        <div class="h-9 bg-smoke-200 dark:bg-smoke-800 rounded-lg w-full" />
      </div>
    </div>
  </div>
</template>
