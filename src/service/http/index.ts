import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useUserStore } from '@/store/modules/user'

// Cấu hình mặc định cho axios
const baseConfig = {
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
}

// Tạo instance axios
export const http: AxiosInstance = axios.create(baseConfig)

// Interceptor cho request
http.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu user đã đăng nhập
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor cho response
http.interceptors.response.use(
  (response) => {
    // Xử lý response thành công
    return response
  },
  (error) => {
    // Xử lý lỗi
    if (error.response) {
      const status = error.response.status
      // Xử lý lỗi 401 Unauthorized
      if (status === 401) {
        const userStore = useUserStore()
        userStore.logout()
        // Redirect về trang login
        window.location.href = '/login'
      }
      
      // Trả về lỗi từ response
      return Promise.reject({
        message: error.response.data?.message || 'Có lỗi xảy ra',
        status,
        data: error.response.data
      })
    }
    
    // Lỗi network hoặc lỗi khác
    return Promise.reject({
      message: error.message || 'Network Error',
      status: 0
    })
  }
)

// Hàm helper để gọi API
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return http.get<T>(url, config)
  },
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return http.post<T>(url, data, config)
  },
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return http.put<T>(url, data, config)
  },
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return http.delete<T>(url, config)
  },
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return http.patch<T>(url, data, config)
  }
}

export default http 