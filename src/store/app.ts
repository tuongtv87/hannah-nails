import { defineStore } from 'pinia'
import { darkTheme, lightTheme } from 'naive-ui'
import { ref, computed, watch } from 'vue'
import type { GlobalThemeOverrides } from 'naive-ui'

// We'll use a separate type definition file for global declarations
export const useAppStore = defineStore('app', () => {
  // State
  const isDarkMode = ref(localStorage.getItem('theme') === 'dark')
  const theme = ref(isDarkMode.value ? darkTheme : lightTheme)

  // Theme overrides for each theme
  const lightThemeOverrides: GlobalThemeOverrides = {
    Layout: {
      color: '#ffffff',
      headerColor: '#ffffff',
      siderColor: '#f5f5f5',
    },
    Menu: {
      itemTextColor: '#333',
      itemColorActive: '#f0f0f0',
      itemColorActiveHover: '#e0e0e0'
    }
  }

  const darkThemeOverrides: GlobalThemeOverrides = {
    Layout: {
      color: '#101014', 
      headerColor: '#18181c',
      siderColor: '#18181c',
    },
    Menu: {
      itemTextColor: '#eee',
      itemColorActive: '#292933',
      itemColorActiveHover: '#303040'
    }
  }

  // Computed theme overrides based on current theme
  const themeOverrides = computed(() => 
    isDarkMode.value ? darkThemeOverrides : lightThemeOverrides
  )

  // Actions
  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value
    theme.value = isDarkMode.value ? darkTheme : lightTheme
    
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
    theme.value = isDarkMode.value ? darkTheme : lightTheme
    updateBodyClass()
  })
  
  return {
    isDarkMode,
    theme,
    themeOverrides,
    toggleTheme
  }
})

// Không khai báo lại Window interface ở đây vì đã có trong src/types/global.d.ts 