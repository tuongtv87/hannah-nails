import { CustomerCreateRequest, CustomerQueryParams, CustomerResponse, CustomersResponse, CustomerUpdateRequest } from '../types/customer';
/**
 * Lấy danh sách khách hàng với phân trang
 */
export declare const getCustomers: (params: CustomerQueryParams) => Promise<CustomersResponse>;
/**
 * Lấy chi tiết một khách hàng theo ID
 */
export declare const getCustomerById: (id: string) => Promise<CustomerResponse>;
/**
 * Tạo một khách hàng mới
 */
export declare const createCustomer: (customerData: CustomerCreateRequest) => Promise<CustomerResponse>;
/**
 * Cập nhật thông tin khách hàng
 */
export declare const updateCustomer: (customerData: CustomerUpdateRequest) => Promise<CustomerResponse>;
/**
 * Xóa một khách hàng
 */
export declare const deleteCustomer: (id: string) => Promise<CustomerResponse>;
/**
 * Tìm kiếm khách hàng theo tên, email hoặc số điện thoại
 */
export declare const searchCustomers: (query: string) => Promise<CustomersResponse>;
declare const _default: {
    getCustomers: (params: CustomerQueryParams) => Promise<CustomersResponse>;
    getCustomerById: (id: string) => Promise<CustomerResponse>;
    createCustomer: (customerData: CustomerCreateRequest) => Promise<CustomerResponse>;
    updateCustomer: (customerData: CustomerUpdateRequest) => Promise<CustomerResponse>;
    deleteCustomer: (id: string) => Promise<CustomerResponse>;
    searchCustomers: (query: string) => Promise<CustomersResponse>;
};
export default _default;
