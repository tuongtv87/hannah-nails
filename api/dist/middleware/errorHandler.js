"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
/**
 * Middleware xử lý lỗi toàn cục
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.code || 500;
    const errorResponse = {
        success: false,
        message: err.message || 'Có lỗi xảy ra',
        code: statusCode
    };
    // Log lỗi
    console.error(`[API ERROR] ${req.method} ${req.path}:`, err);
    return res.status(statusCode).json(errorResponse);
};
exports.errorHandler = errorHandler;
/**
 * Middleware xử lý lỗi 404 khi không tìm thấy route
 */
const notFoundHandler = (req, res) => {
    return res.status(404).json({
        success: false,
        message: `Không tìm thấy đường dẫn ${req.originalUrl}`,
        code: 404
    });
};
exports.notFoundHandler = notFoundHandler;
exports.default = { errorHandler: exports.errorHandler, notFoundHandler: exports.notFoundHandler };
