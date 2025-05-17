<script setup lang="ts">
import { h } from 'vue'
import { NCard, NTable, NTag } from 'naive-ui'
import { WEEKDAYS, WORK_SCHEDULE } from '@/constants'

const columns = [
  {
    title: 'Day',
    key: 'day',
    render: (row: typeof WORK_SCHEDULE[0]) => {
      const dayObj = WEEKDAYS.find(d => d.key === row.day)
      return dayObj ? dayObj.label : row.day
    }
  },
  {
    title: 'Working Hours',
    key: 'hours'
  },
  {
    title: 'Status',
    key: 'isOpen',
    render: (row: typeof WORK_SCHEDULE[0]) => {
      return row.isOpen 
        ? h(NTag, { type: 'success' }, { default: () => 'Open' })
        : h(NTag, { type: 'error' }, { default: () => 'Closed' })
    }
  }
]
</script>

<template>
  <n-card title="Working Schedule">
    <n-table :columns="columns" :data="WORK_SCHEDULE" :bordered="false" />
  </n-card>
</template>

<style scoped>
</style> 