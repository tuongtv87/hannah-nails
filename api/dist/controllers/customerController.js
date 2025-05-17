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
exports.searchCustomers = exports.deleteCustomer = exports.updateCustomer = exports.createCustomer = exports.getCustomerById = exports.getCustomers = void 0;
const customerService = __importStar(require("../services/customerService"));
/**
 * Lấy danh sách khách hàng
 */
const getCustomers = async (req, res) => {
    try {
        const queryParams = {
            page: req.query.page ? Number(req.query.page) : 1,
            pageSize: req.query.pageSize ? Number(req.query.pageSize) : 10,
            sortBy: req.query.sortBy || 'createdAt',
            sortOrder: req.query.sortOrder || 'desc',
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone
        };
        const result = await customerService.getCustomers(queryParams);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy danh sách khách hàng'
        });
    }
};
exports.getCustomers = getCustomers;
/**
 * Lấy chi tiết khách hàng theo ID
 */
const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await customerService.getCustomerById(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy chi tiết khách hàng'
        });
    }
};
exports.getCustomerById = getCustomerById;
/**
 * Tạo khách hàng mới
 */
const createCustomer = async (req, res) => {
    try {
        const customerData = req.body;
        const result = await customerService.createCustomer(customerData);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi tạo khách hàng mới'
        });
    }
};
exports.createCustomer = createCustomer;
/**
 * Cập nhật thông tin khách hàng
 */
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const customerData = {
            id,
            ...req.body
        };
        const result = await customerService.updateCustomer(customerData);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật khách hàng'
        });
    }
};
exports.updateCustomer = updateCustomer;
/**
 * Xóa khách hàng
 */
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await customerService.deleteCustomer(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi xóa khách hàng'
        });
    }
};
exports.deleteCustomer = deleteCustomer;
/**
 * Tìm kiếm khách hàng
 */
const searchCustomers = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            res.status(400).json({
                success: false,
                message: 'Từ khóa tìm kiếm không được để trống'
            });
            return;
        }
        const result = await customerService.searchCustomers(query);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi tìm kiếm khách hàng'
        });
    }
};
exports.searchCustomers = searchCustomers;
exports.default = {
    getCustomers: exports.getCustomers,
    getCustomerById: exports.getCustomerById,
    createCustomer: exports.createCustomer,
    updateCustomer: exports.updateCustomer,
    deleteCustomer: exports.deleteCustomer,
    searchCustomers: exports.searchCustomers
};
