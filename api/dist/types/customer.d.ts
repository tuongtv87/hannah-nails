import { BaseResponse, PaginatedResponse, PaginationParams } from './index';
export interface Customer {
    id?: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    address?: string;
    notes?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lastVisit?: string;
    totalVisits?: number;
    totalSpent?: number;
}
export interface CustomerCreateRequest {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    address?: string;
    notes?: string;
}
export interface CustomerUpdateRequest {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    address?: string;
    notes?: string;
    lastVisit?: string;
    totalVisits?: number;
    totalSpent?: number;
}
export interface CustomerQueryParams extends PaginationParams {
    name?: string;
    email?: string;
    phone?: string;
    lastVisitFrom?: string;
    lastVisitTo?: string;
    minTotalVisits?: number;
    maxTotalVisits?: number;
}
export type CustomerResponse = BaseResponse<Customer>;
export type CustomersResponse = BaseResponse<PaginatedResponse<Customer>>;
