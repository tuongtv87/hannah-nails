import { Request, Response } from 'express';
/**
 * Lấy danh sách lịch hẹn
 */
export declare const getSchedules: (req: Request, res: Response) => Promise<void>;
/**
 * Lấy chi tiết lịch hẹn theo ID
 */
export declare const getScheduleById: (req: Request, res: Response) => Promise<void>;
/**
 * Tạo lịch hẹn mới
 */
export declare const createSchedule: (req: Request, res: Response) => Promise<void>;
/**
 * Cập nhật lịch hẹn
 */
export declare const updateSchedule: (req: Request, res: Response) => Promise<void>;
/**
 * Xóa lịch hẹn
 */
export declare const deleteSchedule: (req: Request, res: Response) => Promise<void>;
/**
 * Cập nhật trạng thái lịch hẹn
 */
export declare const updateScheduleStatus: (req: Request, res: Response) => Promise<void>;
/**
 * Lấy lịch hẹn của một nhân viên trong khoảng thời gian
 */
export declare const getStaffSchedules: (req: Request, res: Response) => Promise<void>;
/**
 * Lấy lịch hẹn của một khách hàng
 */
export declare const getCustomerSchedules: (req: Request, res: Response) => Promise<void>;
declare const _default: {
    getSchedules: (req: Request, res: Response) => Promise<void>;
    getScheduleById: (req: Request, res: Response) => Promise<void>;
    createSchedule: (req: Request, res: Response) => Promise<void>;
    updateSchedule: (req: Request, res: Response) => Promise<void>;
    deleteSchedule: (req: Request, res: Response) => Promise<void>;
    updateScheduleStatus: (req: Request, res: Response) => Promise<void>;
    getStaffSchedules: (req: Request, res: Response) => Promise<void>;
    getCustomerSchedules: (req: Request, res: Response) => Promise<void>;
};
export default _default;
