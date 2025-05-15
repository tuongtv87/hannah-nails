import { request } from '@/service/http'

/**
 * Get all schedules
 */
export function getSchedules(params?: any) {
  return request.Get('/schedules', { params })
}

/**
 * Get schedule by ID
 */
export function getScheduleById(id: string) {
  return request.Get(`/schedules/${id}`)
}

/**
 * Create new schedule
 */
export function createSchedule(data: any) {
  return request.Post('/schedules', data)
}

/**
 * Update schedule
 */
export function updateSchedule(id: string, data: any) {
  return request.Put(`/schedules/${id}`, data)
}

/**
 * Delete schedule
 */
export function deleteSchedule(id: string) {
  return request.Delete(`/schedules/${id}`)
}

/**
 * Update schedule status
 */
export function updateScheduleStatus(id: string, status: string) {
  return request.Patch(`/schedules/${id}/status`, { status })
}

/**
 * Get schedules by date
 */
export function getSchedulesByDate(date: string) {
  return request.Get('/schedules/by-date', {
    params: { date }
  })
}

/**
 * Get schedules by staff
 */
export function getSchedulesByStaff(staffId: string, params?: any) {
  return request.Get(`/staffs/${staffId}/schedules`, { params })
}

/**
 * Get schedules by customer
 */
export function getSchedulesByCustomer(customerId: string, params?: any) {
  return request.Get(`/customers/${customerId}/schedules`, { params })
} 