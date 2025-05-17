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
exports.getAvailableStaffs = exports.updateStaffWorkingHours = exports.getStaffWorkingHours = exports.updateStaffStatus = exports.deleteStaff = exports.updateStaff = exports.createStaff = exports.getStaffById = exports.getStaffs = void 0;
const staffService = __importStar(require("../services/staffService"));
/**
 * Lấy danh sách nhân viên
 */
const getStaffs = async (req, res) => {
    try {
        const queryParams = {
            page: req.query.page ? Number(req.query.page) : 1,
            pageSize: req.query.pageSize ? Number(req.query.pageSize) : 10,
            sortBy: req.query.sortBy || 'createdAt',
            sortOrder: req.query.sortOrder || 'desc',
            name: req.query.name,
            position: req.query.position,
            status: req.query.status,
            skills: req.query.skills
        };
        const result = await staffService.getStaffs(queryParams);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy danh sách nhân viên'
        });
    }
};
exports.getStaffs = getStaffs;
/**
 * Lấy chi tiết nhân viên theo ID
 */
const getStaffById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await staffService.getStaffById(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy chi tiết nhân viên'
        });
    }
};
exports.getStaffById = getStaffById;
/**
 * Tạo nhân viên mới
 */
const createStaff = async (req, res) => {
    try {
        const staffData = req.body;
        const result = await staffService.createStaff(staffData);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi tạo nhân viên mới'
        });
    }
};
exports.createStaff = createStaff;
/**
 * Cập nhật thông tin nhân viên
 */
const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const staffData = {
            id,
            ...req.body
        };
        const result = await staffService.updateStaff(staffData);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật nhân viên'
        });
    }
};
exports.updateStaff = updateStaff;
/**
 * Xóa nhân viên
 */
const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await staffService.deleteStaff(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi xóa nhân viên'
        });
    }
};
exports.deleteStaff = deleteStaff;
/**
 * Cập nhật trạng thái nhân viên
 */
const updateStaffStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            res.status(400).json({
                success: false,
                message: 'Trạng thái không được để trống'
            });
            return;
        }
        const result = await staffService.updateStaffStatus(id, status);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật trạng thái nhân viên'
        });
    }
};
exports.updateStaffStatus = updateStaffStatus;
/**
 * Lấy lịch làm việc của nhân viên
 */
const getStaffWorkingHours = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await staffService.getStaffWorkingHours(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy lịch làm việc của nhân viên'
        });
    }
};
exports.getStaffWorkingHours = getStaffWorkingHours;
/**
 * Cập nhật lịch làm việc của nhân viên
 */
const updateStaffWorkingHours = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật lịch làm việc của nhân viên'
        });
    }
};
exports.updateStaffWorkingHours = updateStaffWorkingHours;
/**
 * Lấy danh sách nhân viên có sẵn trong khoảng thời gian
 */
const getAvailableStaffs = async (req, res) => {
    try {
        const { date, startTime, endTime } = req.query;
        if (!date || !startTime || !endTime) {
            res.status(400).json({
                success: false,
                message: 'Ngày và thời gian không được để trống'
            });
            return;
        }
        const result = await staffService.getAvailableStaffs(date, startTime, endTime);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy danh sách nhân viên có sẵn'
        });
    }
};
exports.getAvailableStaffs = getAvailableStaffs;
exports.default = {
    getStaffs: exports.getStaffs,
    getStaffById: exports.getStaffById,
    createStaff: exports.createStaff,
    updateStaff: exports.updateStaff,
    deleteStaff: exports.deleteStaff,
    updateStaffStatus: exports.updateStaffStatus,
    getStaffWorkingHours: exports.getStaffWorkingHours,
    updateStaffWorkingHours: exports.updateStaffWorkingHours,
    getAvailableStaffs: exports.getAvailableStaffs
};
