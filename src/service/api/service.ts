import { request } from '@/service/http'

/**
 * Lấy danh sách dịch vụ
 */
export function getServices(params?: any) {
  return request.Get('/services', { params })
}

/**
 * Lấy thông tin một dịch vụ
 */
export function getServiceById(id: string) {
  return request.Get(`/services/${id}`)
}

/**
 * Tạo mới dịch vụ
 */
export function createService(data: any) {
  return request.Post('/services', data)
}

/**
 * Cập nhật thông tin dịch vụ
 */
export function updateService(id: string, data: any) {
  return request.Put(`/services/${id}`, data)
}

/**
 * Xóa dịch vụ
 */
export function deleteService(id: string) {
  return request.Delete(`/services/${id}`)
}

/**
 * Cập nhật trạng thái dịch vụ
 */
export function updateServiceStatus(id: string, isActive: boolean) {
  return request.Patch(`/services/${id}/status`, { isActive })
}

/**
 * Tìm kiếm dịch vụ
 */
export function searchServices(query: string) {
  return request.Get('/services/search', {
    params: { query },
  })
} 