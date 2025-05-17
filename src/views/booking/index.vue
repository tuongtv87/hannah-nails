<script setup>
import { ref, computed, onMounted } from 'vue'
import { NSpace, NCard, NAvatar, NTag, NButton, NDatePicker } from 'naive-ui'
import BookingCard from './components/bookingCard.vue'
import StaffDisplay from './components/StaffDisplay.vue'
import WorkingScheduleDisplay from './components/WorkingScheduleDisplay.vue'
import { STAFFS, WEEKDAYS, WORK_SCHEDULE, getWorkingHours, isWorkingDay } from '@/constants'
import { format, addDays, isSameDay } from 'date-fns'

const currentDate = ref(new Date())

// Các biến liên quan đến lịch làm việc
const isOpen = ref(false)
const workingHours = ref('')
const startHour = ref(9)
const startMinute = ref(0)
const endHour = ref(17)
const endMinute = ref(30)

const dayMap = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
}

function updateWorkingScheduleForDate(date) {
  const dayIndex = date.getDay()
  const dayKey = dayMap[dayIndex]
  const schedule = WORK_SCHEDULE.find(s => s.day === dayKey)
  isOpen.value = schedule?.isOpen || false
  workingHours.value = schedule?.hours || ''
  if (isOpen.value && workingHours.value) {
    const [startTime, endTime] = workingHours.value.split(' - ')
    const [startH, startM] = startTime.split(':').map(Number)
    const [endH, endM] = endTime.split(':').map(Number)
    startHour.value = startH
    startMinute.value = startM
    endHour.value = endH
    endMinute.value = endM
  }
}

// Get current day of the week
const today = new Date()
const currentDayIndex = today.getDay() // 0 = Sunday, 1 = Monday, etc.
const currentDayKey = dayMap[currentDayIndex]
const currentDayInfo = computed(() => {
  return WEEKDAYS.find(day => day.key === currentDayKey)
})

// Get today's date in string format YYYY-MM-DD
const yyyy = today.getFullYear()
const mm = String(today.getMonth() + 1).padStart(2, '0')
const dd = String(today.getDate()).padStart(2, '0')
const dateStr = `${yyyy}-${mm}-${dd}`

// Create time slots based on the working hours
const timeSlots = ref([])

function generateTimeSlots() {
  const slots = []
  const startTotalMinutes = startHour.value * 60 + startMinute.value
  const endTotalMinutes = endHour.value * 60 + endMinute.value
  
  for (let minutes = startTotalMinutes; minutes < endTotalMinutes; minutes += 15) {
    const hour = Math.floor(minutes / 60)
    const minute = minutes % 60
    slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`)
  }
  
  return slots
}

// Function to generate duration with fixed values for different services
function getDurationForService(service) {
  const durations = {
    'Hair': 60, // 60 minutes
    'Makeup': 45, // 45 minutes
    'Nails': 30, // 30 minutes
    'Spa': 90, // 90 minutes
    'Massage': 60 // 60 minutes
  }
  return durations[service] || 45 // Default to 45 minutes
}

// Store booking times per staff to avoid conflicts
const staffBookingTimes = {}
STAFFS.forEach(staff => {
  staffBookingTimes[staff.id] = []
})

// Function to check if a time slot is available for a staff member
function isTimeSlotAvailable(staffId, startTimeMinutes, durationMinutes) {
  if (!staffBookingTimes[staffId]) return false
  
  const endTimeMinutes = startTimeMinutes + durationMinutes
  
  for (const booking of staffBookingTimes[staffId]) {
    const bookingStart = booking.startMinutes
    const bookingEnd = booking.endMinutes
    
    // Check if there's any overlap
    if (
      (startTimeMinutes >= bookingStart && startTimeMinutes < bookingEnd) ||
      (endTimeMinutes > bookingStart && endTimeMinutes <= bookingEnd) ||
      (startTimeMinutes <= bookingStart && endTimeMinutes >= bookingEnd)
    ) {
      return false
    }
  }
  
  return true
}

// Generate a random available time slot for a staff member
function findAvailableTimeSlot(staffId, durationMinutes) {
  const startTotalMinutes = startHour.value * 60 + startMinute.value
  const endTotalMinutes = endHour.value * 60 + endMinute.value - durationMinutes
  
  // Try up to 50 random slots before giving up
  for (let attempt = 0; attempt < 50; attempt++) {
    // Generate a random time in 15-minute increments
    const possibleSlots = Math.floor((endTotalMinutes - startTotalMinutes) / 15) + 1
    const randomSlot = Math.floor(Math.random() * possibleSlots)
    const startMinutes = startTotalMinutes + randomSlot * 15
    
    if (isTimeSlotAvailable(staffId, startMinutes, durationMinutes)) {
      return startMinutes
    }
  }
  
  // If we couldn't find a random slot, try sequentially
  for (let minutes = startTotalMinutes; minutes <= endTotalMinutes; minutes += 15) {
    if (isTimeSlotAvailable(staffId, minutes, durationMinutes)) {
      return minutes
    }
  }
  
  return null // No available slot found
}

// Generate customer names
const customerFirstNames = ['James', 'Robert', 'John', 'Michael', 'David', 'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth']
const customerLastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Wilson', 'Taylor']

function getRandomCustomerName() {
  const firstName = customerFirstNames[Math.floor(Math.random() * customerFirstNames.length)]
  const lastName = customerLastNames[Math.floor(Math.random() * customerLastNames.length)]
  return `${firstName} ${lastName}`
}

// Generate random service for a staff member based on their skills
function getRandomServiceForStaff(staff) {
  if (!staff.skills || staff.skills.length === 0) return 'Consultation'
  return staff.skills[Math.floor(Math.random() * staff.skills.length)]
}

// Create bookings for all staff members
const bookings = ref([])

function generateBookings() {
  const startWorkingMinutes = startHour.value * 60 + startMinute.value; // Thời gian bắt đầu làm việc
  const endWorkingMinutes = endHour.value * 60 + endMinute.value; // Thời gian kết thúc làm việc
  const minDuration = 30; // Thời gian tối thiểu cho mỗi booking (30 phút)
  const maxDuration = 120; // Thời gian tối đa cho mỗi booking (2 giờ)
  const stepMinutes = 15; // Khoảng thời gian nhảy bước (15 phút)
  
  const newBookings = [];
  
  STAFFS.forEach(staff => {
    if (staff.status !== 'off') { // Không tạo lịch cho nhân viên nghỉ
      // Bắt đầu từ thời gian mở cửa
      let currentStartMinutes = startWorkingMinutes;
      let bookingCount = 0;
      
      // Tiếp tục tạo booking cho đến khi hết thời gian làm việc
      while (currentStartMinutes < endWorkingMinutes) {
        // Tạo ngẫu nhiên thời gian của booking từ 30 phút đến 2 giờ, nhảy theo bước 15 phút
        const durationSteps = Math.floor(Math.random() * ((maxDuration - minDuration) / stepMinutes + 1));
        const duration = minDuration + (durationSteps * stepMinutes);
        
        let endMinutes = currentStartMinutes + duration;
        
        // Đảm bảo không vượt quá thời gian làm việc
        if (endMinutes > endWorkingMinutes) {
          // Làm tròn xuống theo bước 15 phút
          endMinutes = Math.floor((endWorkingMinutes - currentStartMinutes) / stepMinutes) * stepMinutes + currentStartMinutes;
          if (endMinutes === currentStartMinutes) {
            // Không đủ thời gian cho một booking nào nữa
            break;
          }
        }
        
        // Tính thời gian thực tế của booking
        const actualDuration = endMinutes - currentStartMinutes;
        
        // Chỉ tạo booking nếu còn thời gian (ít nhất 30 phút)
        if (actualDuration >= minDuration) {
          const startHour = Math.floor(currentStartMinutes / 60);
          const startMinute = currentStartMinutes % 60;
          const endHour = Math.floor(endMinutes / 60);
          const endMinute = endMinutes % 60;
          
          const startStr = `${dateStr}T${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}:00`;
          const endStr = `${dateStr}T${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}:00`;
          
          const customerName = getRandomCustomerName();
          const service = getRandomServiceForStaff(staff);
          
          // Tạo booking mới
          newBookings.push({
            id: `booking-${staff.id}-${bookingCount}`,
            title: customerName,
            resourceId: staff.id,
            start: startStr,
            end: endStr,
            content: `Service: ${service}`,
            status: ['Pending', 'Confirmed', 'Working', 'Completed'][Math.floor(Math.random() * 4)]
          });
          
          bookingCount++;
        }
        
        // Cập nhật thời gian bắt đầu cho booking tiếp theo
        // (khách hàng mới bắt đầu ngay khi khách trước kết thúc)
        currentStartMinutes = endMinutes;
      }
    }
  });
  
  bookings.value = newBookings;
}

// Initialize data on component mount
onMounted(() => {
  updateWorkingScheduleForDate(currentDate.value)
  timeSlots.value = generateTimeSlots()
  if (isOpen.value) {
    generateBookings()
  }
})

// Get bookings at a specific time for a staff member
function getBookingsAtTime(staffId, time) {
  // time: 'HH:mm'
  return bookings.value.filter(b => {
    const start = new Date(b.start)
    const startStr = `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`
    return b.resourceId === staffId && startStr === time
  })
}

// Get all bookings for a staff member
function getBookingsForStaff(staffId) {
  return bookings.value.filter(b => b.resourceId === staffId)
}

// Calculate the grid row position based on time
function calculateGridRow(timeStr) {
  // Convert HH:MM to minutes from start of day
  const [hours, minutes] = timeStr.split(':').map(Number)
  const timeInMinutes = hours * 60 + minutes
  
  // Calculate the minutes from start of working hours
  const startTimeInMinutes = startHour.value * 60 + startMinute.value
  
  // Each 15 minutes is 1 row, starting from row 2 (after header)
  return Math.floor((timeInMinutes - startTimeInMinutes) / 15) + 2
}

// Format time range for display
function formatTimeRange(start, end) {
  const s = new Date(start)
  const e = new Date(end)
  return `${String(s.getHours()).padStart(2, '0')}:${String(s.getMinutes()).padStart(2, '0')} - ${String(e.getHours()).padStart(2, '0')}:${String(e.getMinutes()).padStart(2, '0')}`
}

// Calculate duration between two times
function calculateDuration(start, end) {
  const s = new Date(start)
  const e = new Date(end)
  const durationMinutes = Math.round((e - s) / (1000 * 60))
  return durationMinutes
}

// Calculate number of 15-minute blocks for a booking
function calculateTimeBlocks(start, end) {
  const durationMinutes = calculateDuration(start, end)
  return Math.ceil(durationMinutes / 15)
}

// Thêm hàm xử lý thay đổi trạng thái booking
function handleStatusChange(data) {
  const bookingIndex = bookings.value.findIndex(b => b.id === data.id)
  if (bookingIndex !== -1) {
    bookings.value[bookingIndex].status = data.status
  }
}

// Thêm hàm xử lý xem chi tiết và chỉnh sửa booking
function handleViewDetail(booking) {
  console.log('View detail for booking:', booking)
  // Có thể hiển thị modal với thông tin chi tiết
}

function handleEdit(booking) {
  console.log('Edit booking:', booking)
  // Có thể hiển thị form chỉnh sửa
}

const datePickerValue = ref(currentDate.value.getTime())

const selectedDateStr = computed(() => format(new Date(datePickerValue.value), 'yyyy-MM-dd'))
const WEEKDAY_LABELS = [
  'Sunday',    // 0
  'Monday',    // 1
  'Tuesday',   // 2
  'Wednesday', // 3
  'Thursday',  // 4
  'Friday',    // 5
  'Saturday'   // 6
]

const selectedWeekdayLabel = computed(() => {
  const d = new Date(datePickerValue.value)
  return WEEKDAY_LABELS[d.getDay()]
})

function onDateChange(val) {
  const d = new Date(val)
  currentDate.value = d
  updateWorkingScheduleForDate(d)
  timeSlots.value = generateTimeSlots()
  generateBookings()
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
          <template v-for="booking in getBookingsForStaff(staff.id)" :key="booking.id">
            <div class="booking-container"
              :style="{
                gridRow: `${calculateGridRow(new Date(booking.start).getHours() + ':' + new Date(booking.start).getMinutes())} / span ${calculateTimeBlocks(booking.start, booking.end)}`,
                gridColumn: `${STAFFS.findIndex(s => s.id === staff.id) + 2}`,
              }"
            >
              <booking-card
                :card="{
                  ...booking,
                  date: formatTimeRange(booking.start, booking.end),
                  duration: calculateDuration(booking.start, booking.end)
                }"
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
</style>