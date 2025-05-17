export interface BaseResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    code?: number;
}
export interface PaginationParams {
    page: number;
    pageSize: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
export interface ErrorResponse {
    success: false;
    message: string;
    code: number;
}
