import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(localStorage.getItem('theme') === 'dark')

  const theme = computed(() => isDarkMode.value ? darkTheme : null)
  
  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    
    // Update body class for custom styling
    if (isDarkMode.value) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
  }

  // Initialize theme
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light'
    isDarkMode.value = savedTheme === 'dark'
    
    if (isDarkMode.value) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
  }

  return {
    isDarkMode,
    theme,
    toggleTheme,
    initTheme
  }
}) 