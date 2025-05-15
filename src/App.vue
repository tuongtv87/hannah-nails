<script setup lang="ts">
import { onMounted } from 'vue'
import { NConfigProvider, NMessageProvider, NDialogProvider } from 'naive-ui'
import { useThemeStore } from './store/modules/designSetting'

// Use theme store for theme management
const themeStore = useThemeStore()

// Register global functions
declare global {
  interface Window {
    $toggleTheme: () => void;
  }
}

// Register function to window
window.$toggleTheme = () => themeStore.toggleTheme()

// Initialize theme on mount
onMounted(() => {
  themeStore.initTheme()
  console.log('App mounted, current theme:', localStorage.getItem('theme'))
})
</script>

<template>
  <n-config-provider :theme="themeStore.theme">
    <n-message-provider>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

#app {
  height: 100%;
}

/* Basic CSS variables for non-NaiveUI components */
.dark {
  color-scheme: dark;
}

.light {
  color-scheme: light;
}
</style>
