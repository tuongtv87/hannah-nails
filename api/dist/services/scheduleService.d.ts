import { ScheduleCreateRequest, ScheduleQueryParams, ScheduleResponse, SchedulesResponse, ScheduleUpdateRequest, ScheduleStatus } from '../types/schedule';
/**
 * Lấy danh sách lịch hẹn với phân trang
 */
export declare const getSchedules: (params: ScheduleQueryParams) => Promise<SchedulesResponse>;
/**
 * Lấy chi tiết một lịch hẹn theo ID
 */
export declare const getScheduleById: (id: string) => Promise<ScheduleResponse>;
/**
 * Tạo một lịch hẹn mới
 */
export declare const createSchedule: (scheduleData: ScheduleCreateRequest) => Promise<ScheduleResponse>;
/**
 * Cập nhật thông tin lịch hẹn
 */
export declare const updateSchedule: (scheduleData: ScheduleUpdateRequest) => Promise<ScheduleResponse>;
/**
 * Xóa một lịch hẹn
 */
export declare const deleteSchedule: (id: string) => Promise<ScheduleResponse>;
/**
 * Cập nhật trạng thái của lịch hẹn
 */
export declare const updateScheduleStatus: (id: string, status: ScheduleStatus) => Promise<ScheduleResponse>;
/**
 * Lấy lịch hẹn của một nhân viên trong khoảng thời gian
 */
export declare const getStaffSchedules: (staffId: string, startDate: string, endDate: string) => Promise<SchedulesResponse>;
/**
 * Lấy lịch hẹn của một khách hàng
 */
export declare const getCustomerSchedules: (customerId: string) => Promise<SchedulesResponse>;
declare const _default: {
    getSchedules: (params: ScheduleQueryParams) => Promise<SchedulesResponse>;
    getScheduleById: (id: string) => Promise<ScheduleResponse>;
    createSchedule: (scheduleData: ScheduleCreateRequest) => Promise<ScheduleResponse>;
    updateSchedule: (scheduleData: ScheduleUpdateRequest) => Promise<ScheduleResponse>;
    deleteSchedule: (id: string) => Promise<ScheduleResponse>;
    updateScheduleStatus: (id: string, status: ScheduleStatus) => Promise<ScheduleResponse>;
    getStaffSchedules: (staffId: string, startDate: string, endDate: string) => Promise<SchedulesResponse>;
    getCustomerSchedules: (customerId: string) => Promise<SchedulesResponse>;
};
export default _default;
