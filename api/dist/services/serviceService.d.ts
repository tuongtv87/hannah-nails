import { ServiceCreateRequest, ServiceQueryParams, ServiceResponse, ServicesResponse, ServiceUpdateRequest } from '../types/service';
/**
 * Lấy danh sách dịch vụ với phân trang
 */
export declare const getServices: (params: ServiceQueryParams) => Promise<ServicesResponse>;
/**
 * Lấy chi tiết một dịch vụ theo ID
 */
export declare const getServiceById: (id: string) => Promise<ServiceResponse>;
/**
 * Tạo một dịch vụ mới
 */
export declare const createService: (serviceData: ServiceCreateRequest) => Promise<ServiceResponse>;
/**
 * Cập nhật thông tin dịch vụ
 */
export declare const updateService: (serviceData: ServiceUpdateRequest) => Promise<ServiceResponse>;
/**
 * Xóa một dịch vụ
 */
export declare const deleteService: (id: string) => Promise<ServiceResponse>;
/**
 * Cập nhật trạng thái hoạt động của dịch vụ
 */
export declare const updateServiceStatus: (id: string, isActive: boolean) => Promise<ServiceResponse>;
/**
 * Tìm kiếm dịch vụ theo tên, mô tả hoặc danh mục
 */
export declare const searchServices: (query: string) => Promise<ServicesResponse>;
declare const _default: {
    getServices: (params: ServiceQueryParams) => Promise<ServicesResponse>;
    getServiceById: (id: string) => Promise<ServiceResponse>;
    createService: (serviceData: ServiceCreateRequest) => Promise<ServiceResponse>;
    updateService: (serviceData: ServiceUpdateRequest) => Promise<ServiceResponse>;
    deleteService: (id: string) => Promise<ServiceResponse>;
    updateServiceStatus: (id: string, isActive: boolean) => Promise<ServiceResponse>;
    searchServices: (query: string) => Promise<ServicesResponse>;
};
export default _default;
