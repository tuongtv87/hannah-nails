import { Request, Response } from 'express';
import * as scheduleService from '../services/scheduleService';
import { ScheduleCreateRequest, ScheduleUpdateRequest, ScheduleStatus, ScheduleQueryParams } from '../types/schedule';

/**
 * Lấy danh sách lịch hẹn
 */
export const getSchedules = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryParams: ScheduleQueryParams = {
      page: req.query.page ? Number(req.query.page) : 1,
      pageSize: req.query.pageSize ? Number(req.query.pageSize) : 10,
      sortBy: req.query.sortBy as string || 'startTime',
      sortOrder: req.query.sortOrder as 'asc' | 'desc' || 'desc',
      customerId: req.query.customerId as string,
      staffId: req.query.staffId as string,
      status: req.query.status as ScheduleStatus,
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string
    };

    const result = await scheduleService.getSchedules(queryParams);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy danh sách lịch hẹn'
    });
  }
};

/**
 * Lấy chi tiết lịch hẹn theo ID
 */
export const getScheduleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await scheduleService.getScheduleById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy chi tiết lịch hẹn'
    });
  }
};

/**
 * Tạo lịch hẹn mới
 */
export const createSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    const scheduleData: ScheduleCreateRequest = req.body;
    const result = await scheduleService.createSchedule(scheduleData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi tạo lịch hẹn mới'
    });
  }
};

/**
 * Cập nhật lịch hẹn
 */
export const updateSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const scheduleData: ScheduleUpdateRequest = {
      id,
      ...req.body
    };
    const result = await scheduleService.updateSchedule(scheduleData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật lịch hẹn'
    });
  }
};

/**
 * Xóa lịch hẹn
 */
export const deleteSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await scheduleService.deleteSchedule(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi xóa lịch hẹn'
    });
  }
};

/**
 * Cập nhật trạng thái lịch hẹn
 */
export const updateScheduleStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status: ScheduleStatus };
    
    if (!status) {
      res.status(400).json({
        success: false,
        message: 'Trạng thái không được để trống'
      });
      return;
    }
    
    const result = await scheduleService.updateScheduleStatus(id, status);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật trạng thái lịch hẹn'
    });
  }
};

/**
 * Lấy lịch hẹn của một nhân viên trong khoảng thời gian
 */
export const getStaffSchedules = async (req: Request, res: Response): Promise<void> => {
  try {
    const { staffId } = req.params;
    const { startDate, endDate } = req.query as { startDate: string; endDate: string };
    
    if (!startDate || !endDate) {
      res.status(400).json({
        success: false,
        message: 'Ngày bắt đầu và ngày kết thúc không được để trống'
      });
      return;
    }
    
    const result = await scheduleService.getStaffSchedules(staffId, startDate, endDate);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy lịch hẹn của nhân viên'
    });
  }
};

/**
 * Lấy lịch hẹn của một khách hàng
 */
export const getCustomerSchedules = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId } = req.params;
    const result = await scheduleService.getCustomerSchedules(customerId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy lịch hẹn của khách hàng'
    });
  }
};

export default {
  getSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  updateScheduleStatus,
  getStaffSchedules,
  getCustomerSchedules
}; 