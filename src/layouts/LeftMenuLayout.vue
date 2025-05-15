<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger
    @collapse="$emit('update:collapsed', true)"
    @expand="$emit('update:collapsed', false)"
  >
    <!-- Logo Area -->
    <div style="display: flex; align-items: center; justify-content: center; height: 60px;">
      <img src="/vite.svg" alt="Logo" style="width: 36px; height: 36px;" />
      <span v-if="!collapsed" style="margin-left: 12px; font-size: 20px; font-weight: 600;">Hannah</span>
    </div>
    <!-- Menu -->
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :value="activeKey"
      key-field="whateverKey"
      label-field="whateverLabel"
      children-field="whateverChildren"
      @update:value="handleMenuClick"
    />
  </n-layout-sider>
</template>

<script setup lang="ts">
import { h, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NLayoutSider, NIcon, NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'

// Router
const router = useRouter()
const route = useRoute()

// Props and emits
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:collapsed'])

// Menu
const activeKey = computed(() => route.path)

// Generate Icon Component
function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

function routeToMenuOption(route: any): MenuOption {
  return {
    whateverLabel: route.meta?.title || route.name,
    whateverKey: route.path === '' ? '/' : `/${route.path}`,
    icon: route.meta?.icon ? renderIcon(route.meta.icon) : undefined,
    whateverChildren: route.children ? route.children.map(routeToMenuOption) : undefined
  }
}

// Lấy menu từ router
const menuOptions = computed<MenuOption[]>(() => {
  const mainRoute = router.options.routes.find(r => r.path === '/')
  if (!mainRoute || !mainRoute.children) return []
  return mainRoute.children.map(routeToMenuOption)
})

// Handlers
function handleMenuClick(key: string) {
  router.push(key)
}
</script> 