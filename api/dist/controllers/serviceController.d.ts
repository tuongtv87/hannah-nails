import { Request, Response } from 'express';
/**
 * Lấy danh sách dịch vụ
 */
export declare const getServices: (req: Request, res: Response) => Promise<void>;
/**
 * Lấy chi tiết dịch vụ theo ID
 */
export declare const getServiceById: (req: Request, res: Response) => Promise<void>;
/**
 * Tạo dịch vụ mới
 */
export declare const createService: (req: Request, res: Response) => Promise<void>;
/**
 * Cập nhật thông tin dịch vụ
 */
export declare const updateService: (req: Request, res: Response) => Promise<void>;
/**
 * Xóa dịch vụ
 */
export declare const deleteService: (req: Request, res: Response) => Promise<void>;
/**
 * Cập nhật trạng thái dịch vụ
 */
export declare const updateServiceStatus: (req: Request, res: Response) => Promise<void>;
/**
 * Tìm kiếm dịch vụ
 */
export declare const searchServices: (req: Request, res: Response) => Promise<void>;
declare const _default: {
    getServices: (req: Request, res: Response) => Promise<void>;
    getServiceById: (req: Request, res: Response) => Promise<void>;
    createService: (req: Request, res: Response) => Promise<void>;
    updateService: (req: Request, res: Response) => Promise<void>;
    deleteService: (req: Request, res: Response) => Promise<void>;
    updateServiceStatus: (req: Request, res: Response) => Promise<void>;
    searchServices: (req: Request, res: Response) => Promise<void>;
};
export default _default;
