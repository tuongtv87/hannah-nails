"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchServices = exports.updateServiceStatus = exports.deleteService = exports.updateService = exports.createService = exports.getServiceById = exports.getServices = void 0;
const serviceService = __importStar(require("../services/serviceService"));
/**
 * Lấy danh sách dịch vụ
 */
const getServices = async (req, res) => {
    try {
        const queryParams = {
            page: req.query.page ? Number(req.query.page) : 1,
            pageSize: req.query.pageSize ? Number(req.query.pageSize) : 10,
            sortBy: req.query.sortBy || 'createdAt',
            sortOrder: req.query.sortOrder || 'desc',
            name: req.query.name,
            category: req.query.category,
            isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined
        };
        const result = await serviceService.getServices(queryParams);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy danh sách dịch vụ'
        });
    }
};
exports.getServices = getServices;
/**
 * Lấy chi tiết dịch vụ theo ID
 */
const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await serviceService.getServiceById(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy chi tiết dịch vụ'
        });
    }
};
exports.getServiceById = getServiceById;
/**
 * Tạo dịch vụ mới
 */
const createService = async (req, res) => {
    try {
        const serviceData = req.body;
        const result = await serviceService.createService(serviceData);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi tạo dịch vụ mới'
        });
    }
};
exports.createService = createService;
/**
 * Cập nhật thông tin dịch vụ
 */
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const serviceData = {
            id,
            ...req.body
        };
        const result = await serviceService.updateService(serviceData);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật dịch vụ'
        });
    }
};
exports.updateService = updateService;
/**
 * Xóa dịch vụ
 */
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await serviceService.deleteService(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi xóa dịch vụ'
        });
    }
};
exports.deleteService = deleteService;
/**
 * Cập nhật trạng thái dịch vụ
 */
const updateServiceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;
        if (isActive === undefined) {
            res.status(400).json({
                success: false,
                message: 'Trạng thái không được để trống'
            });
            return;
        }
        const result = await serviceService.updateServiceStatus(id, isActive);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật trạng thái dịch vụ'
        });
    }
};
exports.updateServiceStatus = updateServiceStatus;
/**
 * Tìm kiếm dịch vụ
 */
const searchServices = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            res.status(400).json({
                success: false,
                message: 'Từ khóa tìm kiếm không được để trống'
            });
            return;
        }
        const result = await serviceService.searchServices(query);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi tìm kiếm dịch vụ'
        });
    }
};
exports.searchServices = searchServices;
exports.default = {
    getServices: exports.getServices,
    getServiceById: exports.getServiceById,
    createService: exports.createService,
    updateService: exports.updateService,
    deleteService: exports.deleteService,
    updateServiceStatus: exports.updateServiceStatus,
    searchServices: exports.searchServices
};
