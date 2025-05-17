import { Request, Response } from 'express';
import * as serviceService from '../services/serviceService';
import { ServiceCreateRequest, ServiceUpdateRequest, ServiceQueryParams } from '../types/service';

/**
 * Lấy danh sách dịch vụ
 */
export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryParams: ServiceQueryParams = {
      page: req.query.page ? Number(req.query.page) : 1,
      pageSize: req.query.pageSize ? Number(req.query.pageSize) : 10,
      sortBy: req.query.sortBy as string || 'createdAt',
      sortOrder: req.query.sortOrder as 'asc' | 'desc' || 'desc',
      name: req.query.name as string,
      category: req.query.category as string,
      isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined
    };

    const result = await serviceService.getServices(queryParams);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy danh sách dịch vụ'
    });
  }
};

/**
 * Lấy chi tiết dịch vụ theo ID
 */
export const getServiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await serviceService.getServiceById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy chi tiết dịch vụ'
    });
  }
};

/**
 * Tạo dịch vụ mới
 */
export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceData: ServiceCreateRequest = req.body;
    const result = await serviceService.createService(serviceData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi tạo dịch vụ mới'
    });
  }
};

/**
 * Cập nhật thông tin dịch vụ
 */
export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const serviceData: ServiceUpdateRequest = {
      id,
      ...req.body
    };
    const result = await serviceService.updateService(serviceData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật dịch vụ'
    });
  }
};

/**
 * Xóa dịch vụ
 */
export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await serviceService.deleteService(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi xóa dịch vụ'
    });
  }
};

/**
 * Cập nhật trạng thái dịch vụ
 */
export const updateServiceStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { isActive } = req.body as { isActive: boolean };
    
    if (isActive === undefined) {
      res.status(400).json({
        success: false,
        message: 'Trạng thái không được để trống'
      });
      return;
    }
    
    const result = await serviceService.updateServiceStatus(id, isActive);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật trạng thái dịch vụ'
    });
  }
};

/**
 * Tìm kiếm dịch vụ
 */
export const searchServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.query as { query: string };
    
    if (!query) {
      res.status(400).json({
        success: false,
        message: 'Từ khóa tìm kiếm không được để trống'
      });
      return;
    }
    
    const result = await serviceService.searchServices(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi tìm kiếm dịch vụ'
    });
  }
};

export default {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  updateServiceStatus,
  searchServices
}; 