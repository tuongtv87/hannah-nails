import { request } from '@/service/http'

/**
 * Get all staff members
 */
export function getStaff(params?: any) {
  return request.Get('/staffs', { params })
}

/**
 * Get staff member by ID
 */
export function getStaffById(id: string) {
  return request.Get(`/staffs/${id}`)
}

/**
 * Create new staff member
 */
export function createStaff(data: any) {
  return request.Post('/staffs', data)
}

/**
 * Update staff member
 */
export function updateStaff(id: string, data: any) {
  return request.Put(`/staffs/${id}`, data)
}

/**
 * Delete staff member
 */
export function deleteStaff(id: string) {
  return request.Delete(`/staffs/${id}`)
}

/**
 * Update staff status
 */
export function updateStaffStatus(id: string, status: string) {
  return request.Patch(`/staffs/${id}/status`, { status })
}

/**
 * Search staff members
 */
export function searchStaff(query: string) {
  return request.Get('/staffs/search', {
    params: { query },
  })
}

/**
 * Get staff schedules
 */
export function getStaffSchedules(id: string, params?: any) {
  return request.Get(`/staffs/${id}/schedules`, { params })
}

/**
 * Lấy giờ làm việc của nhân viên
 */
export function getStaffWorkingHours(id: string) {
  return request.Get(`/staffs/${id}/working-hours`)
}

/**
 * Cập nhật giờ làm việc của nhân viên
 */
export function updateStaffWorkingHours(id: string, data: any) {
  return request.Put(`/staffs/${id}/working-hours`, {
    data,
  })
}

/**
 * Lấy danh sách nhân viên có sẵn
 */
export function getAvailableStaffs(params = {}) {
  return request.Get('/staffs/available', {
    params,
  })
} 