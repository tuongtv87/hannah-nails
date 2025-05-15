<template>
  <n-layout-header style="height: 56px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px;">
    <!-- Breadcrumb -->
    <n-breadcrumb>
      <n-breadcrumb-item>Dashboard</n-breadcrumb-item>
      <n-breadcrumb-item>{{ pageTitle }}</n-breadcrumb-item>
    </n-breadcrumb>
    
    <div>
      <!-- Theme Toggle -->
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button quaternary circle @click="appStore.toggleTheme">
            <template #icon>
              <n-icon>
                <SunnyOutline v-if="appStore.isDarkMode" />
                <MoonOutline v-else />
              </n-icon>
            </template>
          </n-button>
        </template>
        {{ appStore.isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode" }}
      </n-tooltip>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '../store/app'
import { SunnyOutline, MoonOutline } from '@vicons/ionicons5'
import { NIcon, NButton, NTooltip, NLayoutHeader, NBreadcrumb, NBreadcrumbItem } from 'naive-ui'

// App Store
const appStore = useAppStore()

// Route for breadcrumb
const route = useRoute()
const pageTitle = computed(() => route.meta.title as string || 'Home')
</script> 