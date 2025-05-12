<script setup lang="ts">
import { onMounted } from 'vue'
import { NConfigProvider, NMessageProvider, NDialogProvider } from 'naive-ui'
import { useAppStore } from './store/app'

// Use app store for theme management
const appStore = useAppStore()

// Register global functions
declare global {
  interface Window {
    $toggleTheme: () => void;
  }
}

// Register function to window
window.$toggleTheme = () => appStore.toggleTheme()

// Initialize theme on mount
onMounted(() => {
  console.log('App mounted, current theme:', localStorage.getItem('theme'))
})
</script>

<template>
  <n-config-provider :theme="appStore.theme">
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
