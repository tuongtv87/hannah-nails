import { defineStore } from 'pinia'
import { darkTheme } from 'naive-ui'
import { ref, watch } from 'vue'

// We'll use a separate type definition file for global declarations
export const useAppStore = defineStore('app', () => {
  // State
  const isDarkMode = ref(localStorage.getItem('theme') === 'dark')
  const theme = ref(isDarkMode.value ? darkTheme : null)

  // Actions
  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value
    theme.value = isDarkMode.value ? darkTheme : null
    
    const newThemeMode = isDarkMode.value ? 'dark' : 'light'
    localStorage.setItem('theme', newThemeMode)
    
    // Update body class
    updateBodyClass()
    
    // Dispatch event for components to listen
    window.dispatchEvent(new CustomEvent('themeChange', { detail: newThemeMode }))
    
    // Notify
    if (window.$message) {
      window.$message.success(`Switched to ${isDarkMode.value ? 'Dark' : 'Light'} Mode`)
    }
  }
  
  // Update body class based on theme
  function updateBodyClass() {
    if (isDarkMode.value) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
  }
  
  // Initialize theme on store creation
  function initTheme() {
    updateBodyClass()
  }
  
  // Call init
  initTheme()
  
  // Watch for external theme changes
  watch(isDarkMode, () => {
    theme.value = isDarkMode.value ? darkTheme : null
    updateBodyClass()
  })
  
  return {
    isDarkMode,
    theme,
    toggleTheme
  }
})

// Không khai báo lại Window interface ở đây vì đã có trong src/types/global.d.ts 