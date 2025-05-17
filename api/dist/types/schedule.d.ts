import { BaseResponse, PaginatedResponse, PaginationParams } from './index';
export interface Schedule {
    id: string;
    customerId: string;
    staffId: string;
    serviceId: string;
    startTime: string;
    endTime: string;
    status: ScheduleStatus;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}
export type ScheduleStatus = 'Pending' | 'Confirmed' | 'Working' | 'Completed' | 'Canceled';
export interface ScheduleCreateRequest {
    customerId: string;
    staffId: string;
    serviceId: string;
    startTime: string;
    endTime: string;
    notes?: string;
}
export interface ScheduleUpdateRequest {
    id: string;
    customerId?: string;
    staffId?: string;
    serviceId?: string;
    startTime?: string;
    endTime?: string;
    status?: ScheduleStatus;
    notes?: string;
}
export interface ScheduleQueryParams extends PaginationParams {
    customerId?: string;
    staffId?: string;
    serviceId?: string;
    status?: ScheduleStatus;
    startDate?: string;
    endDate?: string;
}
export type ScheduleResponse = BaseResponse<Schedule>;
export type SchedulesResponse = BaseResponse<PaginatedResponse<Schedule>>;
