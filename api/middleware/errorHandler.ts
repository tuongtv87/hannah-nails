import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types';

/**
 * Middleware xử lý lỗi toàn cục
 */
export const errorHandler = (
  err: Error & { statusCode?: number; code?: number },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || err.code || 500;
  
  const errorResponse: ErrorResponse = {
    success: false,
    message: err.message || 'Có lỗi xảy ra',
    code: statusCode
  };
  
  // Log lỗi
  console.error(`[API ERROR] ${req.method} ${req.path}:`, err);
  
  return res.status(statusCode).json(errorResponse);
};

/**
 * Middleware xử lý lỗi 404 khi không tìm thấy route
 */
export const notFoundHandler = (
  req: Request,
  res: Response
) => {
  return res.status(404).json({
    success: false,
    message: `Không tìm thấy đường dẫn ${req.originalUrl}`,
    code: 404
  });
};

export default { errorHandler, notFoundHandler }; 