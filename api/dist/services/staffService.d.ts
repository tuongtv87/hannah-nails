import { StaffCreateRequest, StaffQueryParams, StaffResponse, StaffsResponse, StaffUpdateRequest, StaffStatus } from '../types/staff';
/**
 * Lấy danh sách nhân viên với phân trang
 */
export declare const getStaffs: (params: StaffQueryParams) => Promise<StaffsResponse>;
/**
 * Lấy chi tiết một nhân viên theo ID
 */
export declare const getStaffById: (id: string) => Promise<StaffResponse>;
/**
 * Tạo một nhân viên mới
 */
export declare const createStaff: (staffData: StaffCreateRequest) => Promise<StaffResponse>;
/**
 * Cập nhật thông tin nhân viên
 */
export declare const updateStaff: (staffData: StaffUpdateRequest) => Promise<StaffResponse>;
/**
 * Xóa một nhân viên
 */
export declare const deleteStaff: (id: string) => Promise<StaffResponse>;
/**
 * Cập nhật trạng thái của nhân viên
 */
export declare const updateStaffStatus: (id: string, status: StaffStatus) => Promise<StaffResponse>;
/**
 * Lấy lịch làm việc của nhân viên
 */
export declare const getStaffWorkingHours: (id: string) => Promise<StaffResponse>;
/**
 * Cập nhật lịch làm việc của nhân viên
 */
export declare const updateStaffWorkingHours: (id: string, workingHours: any) => Promise<StaffResponse>;
/**
 * Lấy danh sách nhân viên có sẵn trong khoảng thời gian
 */
export declare const getAvailableStaffs: (date: string, startTime: string, endTime: string) => Promise<StaffsResponse>;
declare const _default: {
    getStaffs: (params: StaffQueryParams) => Promise<StaffsResponse>;
    getStaffById: (id: string) => Promise<StaffResponse>;
    createStaff: (staffData: StaffCreateRequest) => Promise<StaffResponse>;
    updateStaff: (staffData: StaffUpdateRequest) => Promise<StaffResponse>;
    deleteStaff: (id: string) => Promise<StaffResponse>;
    updateStaffStatus: (id: string, status: StaffStatus) => Promise<StaffResponse>;
    getStaffWorkingHours: (id: string) => Promise<StaffResponse>;
    updateStaffWorkingHours: (id: string, workingHours: any) => Promise<StaffResponse>;
    getAvailableStaffs: (date: string, startTime: string, endTime: string) => Promise<StaffsResponse>;
};
export default _default;
