<template>
  <n-layout has-sider position="absolute" style="height: 100%">
    <!-- Sidebar -->
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
      :native-scrollbar="false"
    >
      <!-- Logo Area -->
      <div class="logo-container">
        <img src="/vite.svg" alt="Logo" class="logo" />
        <h2 v-if="!collapsed" class="logo-text">Hannah Nails</h2>
      </div>

      <!-- Menu -->
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :value="activeKey"
        @update:value="handleMenuClick"
      />
    </n-layout-sider>

    <!-- Main Content -->
    <n-layout>
      <!-- Header -->
      <n-layout-header bordered class="header">
        <div class="header-left">
          <n-button quaternary circle @click="collapsed = !collapsed">
            <template #icon>
              <n-icon>
                <MenuOutline v-if="collapsed" />
                <ChevronBackOutline v-else />
              </n-icon>
            </template>
          </n-button>
          <n-breadcrumb>
            <n-breadcrumb-item>Dashboard</n-breadcrumb-item>
            <n-breadcrumb-item>{{ pageTitle }}</n-breadcrumb-item>
          </n-breadcrumb>
        </div>
        <div class="header-right">
          <!-- Theme Toggle -->
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button quaternary circle @click="appStore.toggleTheme">
                <template #icon>
                  <n-icon>
                    <MoonOutline v-if="appStore.isDarkMode" />
                    <SunnyOutline v-else />
                  </n-icon>
                </template>
              </n-button>
            </template>
            {{ appStore.isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode" }}
          </n-tooltip>
          
        </div>
      </n-layout-header>

      <!-- Content -->
      <n-layout-content position="absolute" style="top: 60px; bottom: 50px">
        <div class="main-content">
          <router-view />
        </div>
      </n-layout-content>
      
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, h, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '../store/app'
import {
  MenuOutline,
  ChevronBackOutline,
  HomeOutline,
  PeopleOutline,
  SettingsOutline,
  SunnyOutline,
  MoonOutline
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'

// Router
const router = useRouter()
const route = useRoute()

// App Store
const appStore = useAppStore()

// Layout States
const collapsed = ref(false)

// Menu
const activeKey = computed(() => route.path)
const pageTitle = computed(() => route.meta.title as string || 'Home')

// Generate Icon Component
function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// Menu Options
const menuOptions: MenuOption[] = [
  {
    label: 'Dashboard',
    key: '/',
    icon: renderIcon(HomeOutline)
  },
  {
    label: 'Customers',
    key: '/customers',
    icon: renderIcon(PeopleOutline)
  },
  {
    label: 'Services',
    key: '/services',
    icon: renderIcon(SettingsOutline)
  }
]

// Handlers
function handleMenuClick(key: string) {
  router.push(key)
}
</script>

<style scoped>
.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid var(--border-color);
}

.logo {
  width: 36px;
  height: 36px;
}

.logo-text {
  margin-left: 12px;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.main-content {
  padding: 16px;
  height: 100%;
  overflow: hidden;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--text-color);
}
</style> 