<script setup>
import { NModal, NCard, NDescriptions, NDescriptionsItem, NSpace, NButton, NTag } from 'naive-ui'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  booking: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['update:show', 'check', 'edit'])

function handleClose() {
  emits('update:show', false)
}

function handleCheck() {
  emits('check', props.booking)
  handleClose()
}

function handleEdit() {
  emits('edit', props.booking)
  handleClose()
}
</script>

<template>
  <n-modal
    :show="show"
    preset="card"
    title="Chi tiết lịch hẹn"
    class="booking-detail-modal"
    @update:show="emits('update:show', $event)"
    @close="handleClose"
  >
    <n-card v-if="booking">
      <n-descriptions bordered>
        <n-descriptions-item label="Tiêu đề">
          {{ booking.title }}
        </n-descriptions-item>
        <n-descriptions-item label="Nội dung">
          {{ booking.content }}
        </n-descriptions-item>
        <n-descriptions-item label="Ngày">
          {{ booking.date }}
        </n-descriptions-item>
        <n-descriptions-item label="Trạng thái">
          <n-tag type="info">{{ booking.status }}</n-tag>
        </n-descriptions-item>
      </n-descriptions>
      
      <template #footer>
        <n-space justify="end">
          <n-button @click="handleCheck">Kiểm tra</n-button>
          <n-button type="primary" @click="handleEdit">Sửa</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>
.booking-detail-modal {
  width: 600px;
  max-width: 90vw;
}
</style> 