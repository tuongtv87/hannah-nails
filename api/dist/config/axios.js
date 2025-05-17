"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// Cấu hình mặc định
const config = {
    baseURL: process.env.API_BASE_URL || '/api',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    }
};
// Tạo instance axios
const axiosInstance = axios_1.default.create(config);
// Request interceptor
axiosInstance.interceptors.request.use((config) => {
    // Trong Node.js, không có localStorage
    // Có thể sử dụng JWT từ các nguồn khác như biến môi trường
    const token = process.env.API_TOKEN || '';
    if (token) {
        // Tránh lỗi kiểu với headers bằng cách sử dụng as unknown
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        };
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// Response interceptor
axiosInstance.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    let errorResponse = {
        success: false,
        message: 'Network Error',
        code: 500
    };
    if (error.response) {
        // Lỗi từ server
        const status = error.response.status;
        const data = error.response.data;
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
});
exports.default = axiosInstance;
