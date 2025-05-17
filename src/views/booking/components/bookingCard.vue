<script setup>
import { NButton, NCard, NSpace, NTag, NDropdown, NAvatar } from 'naive-ui'
import { ref, computed } from 'vue'
import { STAFFS } from '@/constants'

const props = defineProps({
  card: {
    type: Object,
    required: true
  },
  color: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['check', 'edit', 'view-detail', 'status-change'])
const isHovered = ref(false)

// Check if this is a short booking (30 minutes or less)
const isShortBooking = computed(() => {
  return props.card.duration <= 30
})

// Find staff info for this booking
const staffInfo = computed(() => {
  return STAFFS.find(staff => staff.id === props.card.resourceId) || null
})

// Map status to display text and color
const statusConfig = computed(() => {
  const map = {
    'Pending': { text: 'Pending', type: 'warning' },
    'Confirmed': { text: 'Booked', type: 'info' },
    'Working': { text: 'Working', type: 'primary' },
    'Completed': { text: 'Finished', type: 'success' }
  }
  return map[props.card.status] || map['Pending']
})

// Status change dropdown options
const statusOptions = [
  {
    label: 'Pending',
    key: 'Pending',
    props: {
      type: 'warning'
    }
  },
  {
    label: 'Booked',
    key: 'Confirmed',
    props: {
      type: 'info'
    }
  },
  {
    label: 'Working',
    key: 'Working',
    props: {
      type: 'primary'
    }
  },
  {
    label: 'Finished',
    key: 'Completed',
    props: {
      type: 'success'
    }
  }
]

function viewDetails() {
  emits('view-detail', props.card)
}

function editCard() {
  emits('edit', props.card)
}

function handleStatusChange(key) {
  emits('status-change', { id: props.card.id, status: key })
}

function setHovered(value) {
  isHovered.value = value
}
</script>

<template>
  <div 
    class="booking-card-wrapper"
    @mouseenter="setHovered(true)"
    @mouseleave="setHovered(false)"
  >
    <n-card 
      hoverable 
      @dblclick="viewDetails" 
      :class="['custom-card', { 'hovered': isHovered, 'short-booking': isShortBooking }]"
      size="small"
      embedded
    >
      <template #header>
        <div class="card-header">
          <div class="customer-info">
            <span class="customer-name">{{ card.title }}</span>
            <span class="booking-time">{{ card.date }}</span>
          </div>
        </div>
      </template>
      
      <template #header-extra>
        <div class="header-right">
          <n-tag :type="statusConfig.type" class="status-tag">
            {{ statusConfig.text }}
          </n-tag>
          <n-avatar 
            v-if="staffInfo && staffInfo.avatar"
            round 
            :size="32" 
            :src="staffInfo.avatar" 
            class="staff-avatar"
          />
        </div>
      </template>
      
      <div class="card-content">
        <div class="service-info">
          {{ card.content }}
        </div>
        <div v-if="card.notes" class="notes">
          {{ card.notes }}
        </div>
        <div v-if="staffInfo" class="staff-info">
          <span class="staff-label">Staff: </span>
          <span class="staff-name">{{ staffInfo.title }}</span>
        </div>
      </div>
      
      <template #footer>
        <n-space justify="space-between" align="center">
          <n-button size="tiny" ghost @click.stop="viewDetails">Details</n-button>
          <n-button size="tiny" type="warning" ghost @click.stop="editCard">Edit</n-button>
          <n-dropdown
            trigger="click"
            :options="statusOptions"
            @select="handleStatusChange"
            @click.stop
          >
            <n-button size="tiny" type="primary" ghost>Status</n-button>
          </n-dropdown>
        </n-space>
      </template>
    </n-card>
  </div>
</template>

<style scoped>
.booking-card-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.custom-card {
  width: 100%;
  height: 100%;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.custom-card.short-booking:not(.hovered) {
  max-height: none;
}

.custom-card.hovered {
  position: absolute;
  z-index: 100;
  max-height: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
  width: calc(100% + 8px);
  left: -4px;
  height: auto;
  min-height: 100%;
}

.card-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.customer-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.customer-name {
  font-weight: bold;
  font-size: 0.9rem;
}

.booking-time {
  font-size: 0.75rem;
  opacity: 0.8;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-tag {
  margin-right: 2px;
}

.staff-avatar {
  border: 1px solid #f0f0f0;
}

.service-info {
  margin-top: 4px;
  font-size: 0.85rem;
}

.notes {
  margin-top: 4px;
  font-size: 0.8rem;
  font-style: italic;
  opacity: 0.8;
}

.staff-info {
  margin-top: 4px;
  font-size: 0.75rem;
  color: #666;
}

.staff-label {
  font-weight: 600;
}

.staff-name {
  font-style: italic;
}

.card-content {
  flex: 1;
  overflow: hidden;
}

:deep(.n-card-header) {
  padding: 8px 12px 0 12px;
}

:deep(.n-card__content) {
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
}

:deep(.n-card__footer) {
  padding: 4px 12px 8px 12px;
  border-top: none;
}

:deep(.n-tag) {
  font-size: 0.7rem;
  padding: 0 4px;
}

:deep(.n-button) {
  padding: 0 8px;
  font-size: 0.75rem;
}
</style>
