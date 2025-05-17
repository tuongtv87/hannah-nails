import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { ErrorResponse } from '../types';

// Cấu hình mặc định
const config: AxiosRequestConfig = {
  baseURL: process.env.API_BASE_URL || '/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Tạo instance axios
const axiosInstance: AxiosInstance = axios.create(config);

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Trong Node.js, không có localStorage
    // Có thể sử dụng JWT từ các nguồn khác như biến môi trường
    const token = process.env.API_TOKEN || '';
    
    if (token) {
      // Tránh lỗi kiểu với headers bằng cách sử dụng as unknown
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      } as unknown as AxiosRequestHeaders;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    let errorResponse: ErrorResponse = {
      success: false,
      message: 'Network Error',
      code: 500
    };

    if (error.response) {
      // Lỗi từ server
      const status = error.response.status;
      const data = error.response.data as any;
      
      errorResponse = {
        success: false,
        message: data.message || `Error ${status}`,
        code: status
      };

      // Xử lý lỗi xác thực (401)
      if (status === 401) {
        // Trong Node.js, không cần xóa localStorage
        console.log('Authentication failed, please check your credentials');
      }
      
      // Xử lý lỗi forbidden (403)
      if (status === 403) {
        console.log('Access denied, insufficient permissions');
      }
    }

    return Promise.reject(errorResponse);
  }
);

export default axiosInstance; 