import type { Ref } from 'vue'
import { format } from 'date-fns'

// Map ngày trong tuần
export const dayMap = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
}

// Tên ngày trong tuần
export const WEEKDAY_LABELS = [
  'Sunday',    // 0
  'Monday',    // 1
  'Tuesday',   // 2
  'Wednesday', // 3
  'Thursday',  // 4
  'Friday',    // 5
  'Saturday'   // 6
]

/**
 * Cập nhật lịch làm việc cho ngày được chọn
 */
export function updateWorkingScheduleForDate(
  date: Date, 
  workSchedules: any[], 
  state: {
    isOpen: Ref<boolean>,
    workingHours: Ref<string>,
    startHour: Ref<number>,
    startMinute: Ref<number>,
    endHour: Ref<number>,
    endMinute: Ref<number>
  }
) {
  const dayIndex = date.getDay()
  const dayKey = dayMap[dayIndex as keyof typeof dayMap]
  const schedule = workSchedules.find(s => s.day === dayKey)
  
  state.isOpen.value = schedule?.isOpen || false
  state.workingHours.value = schedule?.hours || ''
  
  if (state.isOpen.value && state.workingHours.value) {
    const [startTime, endTime] = state.workingHours.value.split(' - ')
    const [startH, startM] = startTime.split(':').map(Number)
    const [endH, endM] = endTime.split(':').map(Number)
    
    state.startHour.value = startH
    state.startMinute.value = startM
    state.endHour.value = endH
    state.endMinute.value = endM
  }
}

/**
 * Tạo các khoảng thời gian (time slots) dựa trên giờ làm việc
 */
export function generateTimeSlots(startHour: number, startMinute: number, endHour: number, endMinute: number): string[] {
  const slots: string[] = []
  const startTotalMinutes = startHour * 60 + startMinute
  const endTotalMinutes = endHour * 60 + endMinute
  
  for (let minutes = startTotalMinutes; minutes < endTotalMinutes; minutes += 15) {
    const hour = Math.floor(minutes / 60)
    const minute = minutes % 60
    slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`)
  }
  
  return slots
}

/**
 * Tính toán vị trí hàng trong grid dựa vào thời gian
 */
export function calculateGridRow(timeStr: string, startHour: number, startMinute: number): number {
  // Convert HH:MM to minutes from start of day
  const [hours, minutes] = timeStr.split(':').map(Number)
  const timeInMinutes = hours * 60 + minutes
  
  // Calculate the minutes from start of working hours
  const startTimeInMinutes = startHour * 60 + startMinute
  
  // Each 15 minutes is 1 row, starting from row 2 (after header)
  return Math.floor((timeInMinutes - startTimeInMinutes) / 15) + 2
}

/**
 * Format khoảng thời gian để hiển thị
 */
export function formatTimeRange(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  return `${String(s.getHours()).padStart(2, '0')}:${String(s.getMinutes()).padStart(2, '0')} - ${String(e.getHours()).padStart(2, '0')}:${String(e.getMinutes()).padStart(2, '0')}`
}

/**
 * Tính thời lượng giữa hai thời điểm (theo phút)
 */
export function calculateDuration(start: string, end: string): number {
  const s = new Date(start)
  const e = new Date(end)
  const durationMinutes = Math.round((e.getTime() - s.getTime()) / (1000 * 60))
  return durationMinutes
}

/**
 * Tính số khối thời gian 15 phút cho một booking
 */
export function calculateTimeBlocks(start: string, end: string): number {
  const durationMinutes = calculateDuration(start, end)
  return Math.ceil(durationMinutes / 15)
}

/**
 * Format ngày theo định dạng YYYY-MM-DD
 */
export function getFormattedDate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

/**
 * Lấy thông tin ngày hiện tại
 */
export function getCurrentDateInfo() {
  const today = new Date()
  const currentDayIndex = today.getDay() // 0 = Sunday, 1 = Monday, etc.
  const currentDayKey = dayMap[currentDayIndex as keyof typeof dayMap]
  
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  const dateStr = `${yyyy}-${mm}-${dd}`
  
  return {
    today,
    currentDayIndex,
    currentDayKey,
    dateStr
  }
}

/**
 * Kiểm tra xem một khoảng thời gian có khả dụng cho một nhân viên
 */
export function isTimeSlotAvailable(
  staffId: string, 
  startTimeMinutes: number, 
  durationMinutes: number,
  staffBookingTimes: Record<string, { startMinutes: number, endMinutes: number }[]>
): boolean {
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