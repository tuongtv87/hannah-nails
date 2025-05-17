import { Request, Response } from 'express';
/**
 * Lấy danh sách nhân viên
 */
export declare const getStaffs: (req: Request, res: Response) => Promise<void>;
/**
 * Lấy chi tiết nhân viên theo ID
 */
export declare const getStaffById: (req: Request, res: Response) => Promise<void>;
/**
 * Tạo nhân viên mới
 */
export declare const createStaff: (req: Request, res: Response) => Promise<void>;
/**
 * Cập nhật thông tin nhân viên
 */
export declare const updateStaff: (req: Request, res: Response) => Promise<void>;
/**
 * Xóa nhân viên
 */
export declare const deleteStaff: (req: Request, res: Response) => Promise<void>;
/**
 * Cập nhật trạng thái nhân viên
 */
export declare const updateStaffStatus: (req: Request, res: Response) => Promise<void>;
/**
 * Lấy lịch làm việc của nhân viên
 */
export declare const getStaffWorkingHours: (req: Request, res: Response) => Promise<void>;
/**
 * Cập nhật lịch làm việc của nhân viên
 */
export declare const updateStaffWorkingHours: (req: Request, res: Response) => Promise<void>;
/**
 * Lấy danh sách nhân viên có sẵn trong khoảng thời gian
 */
export declare const getAvailableStaffs: (req: Request, res: Response) => Promise<void>;
declare const _default: {
    getStaffs: (req: Request, res: Response) => Promise<void>;
    getStaffById: (req: Request, res: Response) => Promise<void>;
    createStaff: (req: Request, res: Response) => Promise<void>;
    updateStaff: (req: Request, res: Response) => Promise<void>;
    deleteStaff: (req: Request, res: Response) => Promise<void>;
    updateStaffStatus: (req: Request, res: Response) => Promise<void>;
    getStaffWorkingHours: (req: Request, res: Response) => Promise<void>;
    updateStaffWorkingHours: (req: Request, res: Response) => Promise<void>;
    getAvailableStaffs: (req: Request, res: Response) => Promise<void>;
};
export default _default;
