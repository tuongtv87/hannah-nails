import { Request, Response } from 'express';
/**
 * Lấy danh sách khách hàng
 */
export declare const getCustomers: (req: Request, res: Response) => Promise<void>;
/**
 * Lấy chi tiết khách hàng theo ID
 */
export declare const getCustomerById: (req: Request, res: Response) => Promise<void>;
/**
 * Tạo khách hàng mới
 */
export declare const createCustomer: (req: Request, res: Response) => Promise<void>;
/**
 * Cập nhật thông tin khách hàng
 */
export declare const updateCustomer: (req: Request, res: Response) => Promise<void>;
/**
 * Xóa khách hàng
 */
export declare const deleteCustomer: (req: Request, res: Response) => Promise<void>;
/**
 * Tìm kiếm khách hàng
 */
export declare const searchCustomers: (req: Request, res: Response) => Promise<void>;
declare const _default: {
    getCustomers: (req: Request, res: Response) => Promise<void>;
    getCustomerById: (req: Request, res: Response) => Promise<void>;
    createCustomer: (req: Request, res: Response) => Promise<void>;
    updateCustomer: (req: Request, res: Response) => Promise<void>;
    deleteCustomer: (req: Request, res: Response) => Promise<void>;
    searchCustomers: (req: Request, res: Response) => Promise<void>;
};
export default _default;
