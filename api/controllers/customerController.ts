import { Request, Response } from 'express';
import * as customerService from '../services/customerService';
import { CustomerCreateRequest, CustomerUpdateRequest, CustomerQueryParams } from '../types/customer';

/**
 * Lấy danh sách khách hàng
 */
export const getCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryParams: CustomerQueryParams = {
      page: req.query.page ? Number(req.query.page) : 1,
      pageSize: req.query.pageSize ? Number(req.query.pageSize) : 10,
      sortBy: req.query.sortBy as string || 'createdAt',
      sortOrder: req.query.sortOrder as 'asc' | 'desc' || 'desc',
      name: req.query.name as string,
      email: req.query.email as string,
      phone: req.query.phone as string
    };

    const result = await customerService.getCustomers(queryParams);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy danh sách khách hàng'
    });
  }
};

/**
 * Lấy chi tiết khách hàng theo ID
 */
export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await customerService.getCustomerById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy chi tiết khách hàng'
    });
  }
};

/**
 * Tạo khách hàng mới
 */
export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customerData: CustomerCreateRequest = req.body;
    const result = await customerService.createCustomer(customerData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi tạo khách hàng mới'
    });
  }
};

/**
 * Cập nhật thông tin khách hàng
 */
export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const customerData: CustomerUpdateRequest = {
      id,
      ...req.body
    };
    const result = await customerService.updateCustomer(customerData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật khách hàng'
    });
  }
};

/**
 * Xóa khách hàng
 */
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await customerService.deleteCustomer(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi xóa khách hàng'
    });
  }
};

/**
 * Tìm kiếm khách hàng
 */
export const searchCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.query as { query: string };
    
    if (!query) {
      res.status(400).json({
        success: false,
        message: 'Từ khóa tìm kiếm không được để trống'
      });
      return;
    }
    
    const result = await customerService.searchCustomers(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi không xác định khi tìm kiếm khách hàng'
    });
  }
};

export default {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomers
}; 