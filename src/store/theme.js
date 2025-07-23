import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const theme = ref(localStorage.getItem('theme') || 'system')
  
  // Getters
  const currentTheme = computed(() => {
    if (theme.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme.value
  })
  
  const isDark = computed(() => currentTheme.value === 'dark')
  
  // Actions
  function setTheme(newTheme) {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme()
  }
  
  function applyTheme() {
    const html = document.documentElement
    
    if (currentTheme.value === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }
  
  function initializeTheme() {
    applyTheme()
    
    // Listen for system theme changes
    if (theme.value === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', applyTheme)
    }
  }
  
  return {
    theme,
    currentTheme,
    isDark,
    setTheme,
    applyTheme,
    initializeTheme
  }
})