<script setup lang="ts">
import { NCard, NList, NListItem, NThing, NTag, NAvatar, NSpace } from 'naive-ui'
import { STAFFS, STATUS_TYPES } from '@/constants'

function getStatusType(status: 'available' | 'busy' | 'off') {
  return STATUS_TYPES[status].type
}

function getStatusLabel(status: 'available' | 'busy' | 'off') {
  return STATUS_TYPES[status].label
}
</script>

<template>
  <n-card title="Staff List">
    <n-list hoverable>
      <n-list-item v-for="staff in STAFFS" :key="staff.id">
        <n-thing>
          <template #avatar>
            <n-avatar 
              round 
              :size="64" 
              :src="staff.avatar" 
              fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            />
          </template>
          <template #header>
            <span class="font-bold text-lg">{{ staff.title }}</span>
          </template>
          <template #header-extra>
            <n-tag :type="getStatusType(staff.status)">
              {{ getStatusLabel(staff.status) }}
            </n-tag>
          </template>
          <template #description>
            <span>{{ staff.position }}</span>
          </template>
          <div>
            <n-space>
              <n-tag v-for="skill in staff.skills" :key="skill" size="small">
                {{ skill }}
              </n-tag>
            </n-space>
          </div>
        </n-thing>
      </n-list-item>
    </n-list>
  </n-card>
</template>

<style scoped>
</style> 