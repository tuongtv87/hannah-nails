import type { Booking, Staff } from './types'
import { formatTimeRange, calculateDuration, calculateTimeBlocks } from './timeUtils'

/**
 * Lấy tất cả booking cho một nhân viên
 */
export function getBookingsForStaff(bookings: Booking[], staffId: string): Booking[] {
  return bookings.filter(b => b.resourceId === staffId)
}

/**
 * Lấy booking tại một thời điểm cụ thể cho một nhân viên
 */
export function getBookingsAtTime(bookings: Booking[], staffId: string, time: string): Booking[] {
  return bookings.filter(b => {
    const start = new Date(b.start)
    const startStr = `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`
    return b.resourceId === staffId && startStr === time
  })
}

/**
 * Chuẩn bị dữ liệu booking để hiển thị trong BookingCard
 */
export function prepareBookingCardData(booking: Booking) {
  return {
    ...booking,
    date: formatTimeRange(booking.start, booking.end),
    duration: calculateDuration(booking.start, booking.end)
  }
}

/**
 * Cập nhật trạng thái của một booking
 */
export function updateBookingStatus(
  bookings: Booking[], 
  bookingId: string, 
  newStatus: 'Pending' | 'Confirmed' | 'Working' | 'Completed'
): Booking[] {
  return bookings.map(booking => {
    if (booking.id === bookingId) {
      return { ...booking, status: newStatus }
    }
    return booking
  })
}

/**
 * Kiểm tra xem booking có trùng lặp với một booking khác không
 */
export function isBookingOverlapping(
  booking: Booking, 
  otherBooking: Booking
): boolean {
  const start1 = new Date(booking.start).getTime()
  const end1 = new Date(booking.end).getTime()
  const start2 = new Date(otherBooking.start).getTime()
  const end2 = new Date(otherBooking.end).getTime()
  
  return (
    (start1 >= start2 && start1 < end2) ||
    (end1 > start2 && end1 <= end2) ||
    (start1 <= start2 && end1 >= end2)
  )
}

/**
 * Tìm các booking bị trùng với khoảng thời gian cho trước
 */
export function findOverlappingBookings(
  bookings: Booking[], 
  staffId: string, 
  start: string, 
  end: string
): Booking[] {
  const staffBookings = getBookingsForStaff(bookings, staffId)
  const startTime = new Date(start).getTime()
  const endTime = new Date(end).getTime()
  
  return staffBookings.filter(booking => {
    const bookingStart = new Date(booking.start).getTime()
    const bookingEnd = new Date(booking.end).getTime()
    
    return (
      (startTime >= bookingStart && startTime < bookingEnd) ||
      (endTime > bookingStart && endTime <= bookingEnd) ||
      (startTime <= bookingStart && endTime >= bookingEnd)
    )
  })
}

/**
 * Chuyển đổi dữ liệu booking để sử dụng trong grid
 */
export function getBookingPositionInGrid(
  booking: Booking, 
  staff: Staff, 
  staffs: Staff[],
  startHour: number,
  startMinute: number
) {
  const start = new Date(booking.start)
  const timeStr = `${start.getHours()}:${start.getMinutes()}`
  
  return {
    gridRow: `${calculateGridRow(timeStr, startHour, startMinute)} / span ${calculateTimeBlocks(booking.start, booking.end)}`,
    gridColumn: `${staffs.findIndex(s => s.id === staff.id) + 2}`
  }
}

/**
 * Tính vị trí hàng trong grid dựa vào thời gian
 */
function calculateGridRow(timeStr: string, startHour: number, startMinute: number): number {
  // Chuyển đổi HH:MM thành phút tính từ đầu ngày
  const [hours, minutes] = timeStr.split(':').map(Number)
  const timeInMinutes = hours * 60 + minutes
  
  // Tính số phút từ thời điểm bắt đầu làm việc
  const startTimeInMinutes = startHour * 60 + startMinute
  
  // Mỗi 15 phút là 1 dòng, bắt đầu từ dòng 2 (sau header)
  return Math.floor((timeInMinutes - startTimeInMinutes) / 15) + 2
} 