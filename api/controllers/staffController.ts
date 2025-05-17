import { Request, Response } from 'express';
import * as staffService from '../services/staffService';
import { StaffCreateRequest, StaffUpdateRequest, StaffStatus, StaffQueryParams } from '../types/staff';

/**
 * Lấy danh sách nhân viên
 */
export const getStaffs = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryParams: StaffQueryParams = {
      page: req.query.page ? Number(req.query.page) : 1,
      pageSize: req.query.pageSize ? Number(req.query.pageSize) : 10,
      sortBy: req.query.sortBy as string || 'createdAt',
      sortOrder: req.query.sortOrder as 'asc' | 'desc' || 'desc',
      name: req.query.name as string,
      position: req.query.position as string,
      status: req.query.status as StaffStatus,
      skills: req.query.skills as string
    };

    const result = await staffService.getStaffs(queryParams);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy danh sách nhân viên'
    });
  }
};

/**
 * Lấy chi tiết nhân viên theo ID
 */
export const getStaffById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await staffService.getStaffById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy chi tiết nhân viên'
    });
  }
};

/**
 * Tạo nhân viên mới
 */
export const createStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const staffData: StaffCreateRequest = req.body;
    const result = await staffService.createStaff(staffData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi tạo nhân viên mới'
    });
  }
};

/**
 * Cập nhật thông tin nhân viên
 */
export const updateStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const staffData: StaffUpdateRequest = {
      id,
      ...req.body
    };
    const result = await staffService.updateStaff(staffData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật nhân viên'
    });
  }
};

/**
 * Xóa nhân viên
 */
export const deleteStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await staffService.deleteStaff(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi xóa nhân viên'
    });
  }
};

/**
 * Cập nhật trạng thái nhân viên
 */
export const updateStaffStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status: StaffStatus };
    
    if (!status) {
      res.status(400).json({
        success: false,
        message: 'Trạng thái không được để trống'
      });
      return;
    }
    
    const result = await staffService.updateStaffStatus(id, status);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật trạng thái nhân viên'
    });
  }
};

/**
 * Lấy lịch làm việc của nhân viên
 */
export const getStaffWorkingHours = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await staffService.getStaffWorkingHours(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy lịch làm việc của nhân viên'
    });
  }
};

/**
 * Cập nhật lịch làm việc của nhân viên
 */
export const updateStaffWorkingHours = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { workingHours } = req.body;
    
    if (!workingHours || !Array.isArray(workingHours)) {
      res.status(400).json({
        success: false,
        message: 'Lịch làm việc không hợp lệ'
      });
      return;
    }
    
    const result = await staffService.updateStaffWorkingHours(id, workingHours);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật lịch làm việc của nhân viên'
    });
  }
};

/**
 * Lấy danh sách nhân viên có sẵn trong khoảng thời gian
 */
export const getAvailableStaffs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, startTime, endTime } = req.query as { date: string; startTime: string; endTime: string };
    
    if (!date || !startTime || !endTime) {
      res.status(400).json({
        success: false,
        message: 'Ngày và thời gian không được để trống'
      });
      return;
    }
    
    const result = await staffService.getAvailableStaffs(date, startTime, endTime);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy danh sách nhân viên có sẵn'
    });
  }
};

export default {
  getStaffs,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  updateStaffStatus,
  getStaffWorkingHours,
  updateStaffWorkingHours,
  getAvailableStaffs
}; 