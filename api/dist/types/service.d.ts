import { BaseResponse, PaginatedResponse, PaginationParams } from './index';
export interface Service {
    id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    category: string;
    image?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface ServiceCreateRequest {
    name: string;
    description: string;
    duration: number;
    price: number;
    category: string;
    image?: string;
    isActive?: boolean;
}
export interface ServiceUpdateRequest {
    id: string;
    name?: string;
    description?: string;
    duration?: number;
    price?: number;
    category?: string;
    image?: string;
    isActive?: boolean;
}
export interface ServiceQueryParams extends PaginationParams {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minDuration?: number;
    maxDuration?: number;
    isActive?: boolean;
}
export type ServiceResponse = BaseResponse<Service>;
export type ServicesResponse = BaseResponse<PaginatedResponse<Service>>;
