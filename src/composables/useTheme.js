import { ref, watchEffect } from 'vue'

const isDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value
  }

  watchEffect(() => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  return { isDark, toggleTheme }
}
