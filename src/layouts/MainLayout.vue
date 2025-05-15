<template>
  <n-layout has-sider style="height: 100vh;">
    <LeftMenuLayout :collapsed="menuCollapsed" @update:collapsed="menuCollapsed = $event" />
    <n-layout>
      <HeaderLayout />
      <ContentLayout />
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NLayout } from 'naive-ui'
import HeaderLayout from './HeaderLayout.vue'
import LeftMenuLayout from './LeftMenuLayout.vue'
import ContentLayout from './ContentLayout.vue'
const menuCollapsed = ref(false)
</script>

<style scoped>



</style> 