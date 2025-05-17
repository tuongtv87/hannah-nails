import type { Booking, Staff } from './types'

// Danh sách họ và tên ngẫu nhiên
const customerFirstNames = ['James', 'Robert', 'John', 'Michael', 'David', 'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth']
const customerLastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Wilson', 'Taylor']

/**
 * Tạo một tên khách hàng ngẫu nhiên
 */
export function getRandomCustomerName(): string {
  const firstName = customerFirstNames[Math.floor(Math.random() * customerFirstNames.length)]
  const lastName = customerLastNames[Math.floor(Math.random() * customerLastNames.length)]
  return `${firstName} ${lastName}`
}

/**
 * Tạo một dịch vụ ngẫu nhiên cho nhân viên dựa trên kỹ năng của họ
 */
export function getRandomServiceForStaff(staff: Staff): string {
  if (!staff.skills || staff.skills.length === 0) return 'Consultation'
  return staff.skills[Math.floor(Math.random() * staff.skills.length)]
}

/**
 * Thời lượng cố định cho các loại dịch vụ khác nhau
 */
export function getDurationForService(service: string): number {
  const durations: Record<string, number> = {
    'Hair': 60, // 60 minutes
    'Makeup': 45, // 45 minutes
    'Nails': 30, // 30 minutes
    'Spa': 90, // 90 minutes
    'Massage': 60 // 60 minutes
  }
  return durations[service] || 45 // Default to 45 minutes
}

/**
 * Tạo một slot thời gian có sẵn ngẫu nhiên cho một nhân viên
 */
export function findAvailableTimeSlot(
  staffId: string, 
  durationMinutes: number,
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number,
  staffBookingTimes: Record<string, { startMinutes: number, endMinutes: number }[]>
): number | null {
  const startTotalMinutes = startHour * 60 + startMinute
  const endTotalMinutes = endHour * 60 + endMinute - durationMinutes
  
  // Try up to 50 random slots before giving up
  for (let attempt = 0; attempt < 50; attempt++) {
    // Generate a random time in 15-minute increments
    const possibleSlots = Math.floor((endTotalMinutes - startTotalMinutes) / 15) + 1
    const randomSlot = Math.floor(Math.random() * possibleSlots)
    const startMinutes = startTotalMinutes + randomSlot * 15
    
    if (isTimeSlotAvailable(staffId, startMinutes, durationMinutes, staffBookingTimes)) {
      return startMinutes
    }
  }
  
  // If we couldn't find a random slot, try sequentially
  for (let minutes = startTotalMinutes; minutes <= endTotalMinutes; minutes += 15) {
    if (isTimeSlotAvailable(staffId, minutes, durationMinutes, staffBookingTimes)) {
      return minutes
    }
  }
  
  return null // No available slot found
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

/**
 * Tạo các booking ngẫu nhiên cho tất cả nhân viên
 */
export function generateBookings(
  staffs: Staff[],
  dateStr: string,
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number
): Booking[] {
  const startWorkingMinutes = startHour * 60 + startMinute; // Thời gian bắt đầu làm việc
  const endWorkingMinutes = endHour * 60 + endMinute; // Thời gian kết thúc làm việc
  const minDuration = 30; // Thời gian tối thiểu cho mỗi booking (30 phút)
  const maxDuration = 120; // Thời gian tối đa cho mỗi booking (2 giờ)
  const stepMinutes = 15; // Khoảng thời gian nhảy bước (15 phút)
  
  const newBookings: Booking[] = [];
  
  staffs.forEach(staff => {
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
            status: ['Pending', 'Confirmed', 'Working', 'Completed'][Math.floor(Math.random() * 4)] as 'Pending' | 'Confirmed' | 'Working' | 'Completed'
          });
          
          bookingCount++;
        }
        
        // Cập nhật thời gian bắt đầu cho booking tiếp theo
        // (khách hàng mới bắt đầu ngay khi khách trước kết thúc)
        currentStartMinutes = endMinutes;
      }
    }
  });
  
  return newBookings;
} 