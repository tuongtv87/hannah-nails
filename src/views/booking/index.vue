<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { NSpace, NCard, NAvatar, NTag, NButton, NDatePicker } from 'naive-ui'
import BookingCard from './components/bookingCard.vue'
import StaffDisplay from './components/StaffDisplay.vue'
import WorkingScheduleDisplay from './components/WorkingScheduleDisplay.vue'
import { STAFFS, WEEKDAYS, WORK_SCHEDULE } from '@/constants'
import { format, addDays, isSameDay } from 'date-fns'

// Import từ các file TS đã tách
import type { Booking, Staff } from './types'
import { 
  updateWorkingScheduleForDate, 
  generateTimeSlots, 
  WEEKDAY_LABELS, 
  getFormattedDate,
  calculateTimeBlocks as calculateTimeBlocksUtil,
  formatTimeRange as formatTimeRangeUtil,
  calculateDuration as calculateDurationUtil
} from './timeUtils'
import { 
  getBookingsForStaff, 
  prepareBookingCardData,
  updateBookingStatus
} from './bookingUtils'
import { generateBookings } from './dataGenerator'

// State
const currentDate = ref(new Date())
const isOpen = ref(false)
const workingHours = ref('')
const startHour = ref(9)
const startMinute = ref(0)
const endHour = ref(17)
const endMinute = ref(30)
const timeSlots = ref<string[]>([])
const bookings = ref<Booking[]>([])
const datePickerValue = ref(currentDate.value.getTime())

// Computed values
const selectedDateStr = computed(() => format(new Date(datePickerValue.value), 'yyyy-MM-dd'))
const selectedWeekdayLabel = computed(() => {
  const d = new Date(datePickerValue.value)
  return WEEKDAY_LABELS[d.getDay()]
})

// Initialize data on component mount
onMounted(() => {
  updateWorkingScheduleForDate(currentDate.value, WORK_SCHEDULE, {
    isOpen,
    workingHours,
    startHour,
    startMinute,
    endHour,
    endMinute
  })
  
  timeSlots.value = generateTimeSlots(startHour.value, startMinute.value, endHour.value, endMinute.value)
  
  if (isOpen.value) {
    generateAndSetBookings()
  }
})

// Xử lý thay đổi ngày
function onDateChange(val: number) {
  const d = new Date(val)
  currentDate.value = d
  
  updateWorkingScheduleForDate(d, WORK_SCHEDULE, {
    isOpen,
    workingHours,
    startHour,
    startMinute,
    endHour,
    endMinute
  })
  
  timeSlots.value = generateTimeSlots(startHour.value, startMinute.value, endHour.value, endMinute.value)
  
  generateAndSetBookings()
}

// Tạo và cập nhật bookings
function generateAndSetBookings() {
  if (isOpen.value) {
    const dateStr = getFormattedDate(currentDate.value)
    bookings.value = generateBookings(
      STAFFS,
      dateStr,
      startHour.value,
      startMinute.value,
      endHour.value,
      endMinute.value
    )
  } else {
    bookings.value = []
  }
}

// Tính toán vị trí hàng trong grid dựa vào thời gian
function calculateGridRow(timeStr: string): number {
  // Convert HH:MM to minutes from start of day
  const [hours, minutes] = timeStr.split(':').map(Number)
  const timeInMinutes = hours * 60 + minutes
  
  // Calculate the minutes from start of working hours
  const startTimeInMinutes = startHour.value * 60 + startMinute.value
  
  // Each 15 minutes is 1 row, starting from row 2 (after header)
  return Math.floor((timeInMinutes - startTimeInMinutes) / 15) + 2
}

// Forward các hàm từ timeUtils để sử dụng trong template
function calculateTimeBlocks(start: string, end: string): number {
  return calculateTimeBlocksUtil(start, end)
}


// Xử lý các sự kiện UI

// Thêm hàm xử lý thay đổi trạng thái booking
function handleStatusChange(data: { id: string, status: 'Pending' | 'Confirmed' | 'Working' | 'Completed' }) {
  const bookingIndex = bookings.value.findIndex(b => b.id === data.id)
  if (bookingIndex !== -1) {
    bookings.value[bookingIndex].status = data.status
  }
}

// Thêm hàm xử lý xem chi tiết và chỉnh sửa booking
function handleViewDetail(booking: Booking) {
  console.log('View detail for booking:', booking)
  // Có thể hiển thị modal với thông tin chi tiết
}

function handleEdit(booking: Booking) {
  console.log('Edit booking:', booking)
  // Có thể hiển thị form chỉnh sửa
}
</script>

<template>  
  <NSpace vertical size="large">
    <n-card>
      <div style="display: flex; align-items: center; gap: 16px;">
        <n-date-picker v-model:value="datePickerValue" type="date" @update:value="onDateChange" style="width: 200px;" />
        <span style="font-weight: bold;">
          {{ selectedWeekdayLabel }} - {{ selectedDateStr }} - {{ isOpen ? workingHours : 'Closed' }}
        </span>
      </div>
    </n-card>    
    <n-card v-if="isOpen && timeSlots.length > 0">      
      <div class="schedule-grid" 
        :style="{
          gridTemplateColumns: `70px repeat(${STAFFS.length}, 1fr)`,
          gridTemplateRows: `auto repeat(${timeSlots.length}, 36px)`
        }"
      >
        <!-- Header -->
        <div class="time-header"></div>
        <div v-for="staff in STAFFS" :key="staff.id" class="staff-header">
          <div class="staff-info">
            <n-avatar 
              round 
              :size="36" 
              :src="staff.avatar" 
              fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
              class="staff-avatar"
            />
            <div class="staff-name">{{ staff.title }}</div>
          </div>
          <div class="staff-position">{{ staff.position }}</div>
          <div class="staff-status">
            <n-tag size="small" :type="staff.status === 'available' ? 'success' : staff.status === 'busy' ? 'warning' : 'error'">
              {{ staff.status === 'available' ? 'Available' : staff.status === 'busy' ? 'Busy' : 'Off' }}
            </n-tag>
          </div>
        </div>

        <!-- Time rows -->
        <template v-for="(time, index) in timeSlots" :key="time">
          <!-- Time label -->
          <div class="time-label" :style="`grid-row: ${index + 2}`">
            {{ time }}
          </div>
          <!-- Empty booking cells for grid structure -->
          <div
            v-for="staff in STAFFS"
            :key="staff.id + time"
            class="booking-cell"
            :style="`grid-row: ${index + 2}; grid-column: ${STAFFS.findIndex(s => s.id === staff.id) + 2}`"
          ></div>
        </template>
        
        <!-- Actual bookings positioned absolutely within the grid -->
        <template v-for="staff in STAFFS" :key="`bookings-${staff.id}`">
          <template v-for="booking in getBookingsForStaff(bookings, staff.id)" :key="booking.id">
            <div class="booking-container"
              :style="{
                gridRow: `${calculateGridRow(new Date(booking.start).getHours() + ':' + new Date(booking.start).getMinutes())} / span ${calculateTimeBlocks(booking.start, booking.end)}`,
                gridColumn: `${STAFFS.findIndex(s => s.id === staff.id) + 2}`,
              }"
            >
              <booking-card
                :card="prepareBookingCardData(booking)"
                @view-detail="handleViewDetail"
                @edit="handleEdit"
                @status-change="handleStatusChange"
              />
            </div>
          </template>
        </template>
      </div>
    </n-card>
    
    <n-card v-else>
      <div class="text-center py-8">
        <h3>No schedule available for today</h3>
        <p>The salon is closed today or there's no schedule information available.</p>
      </div>
    </n-card>
  </NSpace>
</template>

<style scoped>
h2, h3 {
  margin: 0;
}

.schedule-grid {
  display: grid;
  gap: 8px 12px;
  overflow-x: auto;
  position: relative;
}

.time-header {
  text-align: right;
  padding-right: 8px;
  font-weight: bold;
  grid-row: 1;
  grid-column: 1;
}

.staff-header {
  text-align: center;
  font-weight: bold;
  padding: 8px 4px;
  border-bottom: 1px solid #f0f0f0;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.staff-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.staff-avatar {
  border: 2px solid #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.staff-name {
  font-weight: bold;
  font-size: 0.9rem;
}

.staff-position {
  font-size: 0.75rem;
  font-weight: normal;
  color: #666;
  margin-top: 0;
}

.staff-status {
  margin-top: 2px;
}

.time-label {
  text-align: right;
  padding-right: 8px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  grid-column: 1;
}

.booking-cell {
  min-height: 36px;
  position: relative;
  padding: 0 2px;
  border-bottom: 1px dashed #f0f0f0;
}

.booking-container {
  padding: 0 2px;
  height: 100%;
}

.text-center {
  text-align: center;
}

.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>