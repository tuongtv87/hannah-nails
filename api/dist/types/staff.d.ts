import { BaseResponse, PaginatedResponse, PaginationParams } from './index';
export interface Staff {
    id: string;
    name: string;
    position: string;
    email: string;
    phone: string;
    avatar: string;
    status: StaffStatus;
    skills: string[];
    workingHours?: WorkingHours[];
    createdAt: string;
    updatedAt: string;
}
export type StaffStatus = 'available' | 'busy' | 'off';
export interface WorkingHours {
    day: string;
    startTime: string;
    endTime: string;
    isWorkingDay: boolean;
}
export interface StaffCreateRequest {
    name: string;
    position: string;
    email: string;
    phone: string;
    avatar?: string;
    status?: StaffStatus;
    skills?: string[];
    workingHours?: WorkingHours[];
}
export interface StaffUpdateRequest {
    id: string;
    name?: string;
    position?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    status?: StaffStatus;
    skills?: string[];
    workingHours?: WorkingHours[];
}
export interface StaffQueryParams extends PaginationParams {
    name?: string;
    position?: string;
    status?: StaffStatus;
    skills?: string;
}
export type StaffResponse = BaseResponse<Staff>;
export type StaffsResponse = BaseResponse<PaginatedResponse<Staff>>;
