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
exports.getCustomerSchedules = exports.getStaffSchedules = exports.updateScheduleStatus = exports.deleteSchedule = exports.updateSchedule = exports.createSchedule = exports.getScheduleById = exports.getSchedules = void 0;
const scheduleService = __importStar(require("../services/scheduleService"));
/**
 * Lấy danh sách lịch hẹn
 */
const getSchedules = async (req, res) => {
    try {
        const queryParams = {
            page: req.query.page ? Number(req.query.page) : 1,
            pageSize: req.query.pageSize ? Number(req.query.pageSize) : 10,
            sortBy: req.query.sortBy || 'startTime',
            sortOrder: req.query.sortOrder || 'desc',
            customerId: req.query.customerId,
            staffId: req.query.staffId,
            status: req.query.status,
            startDate: req.query.startDate,
            endDate: req.query.endDate
        };
        const result = await scheduleService.getSchedules(queryParams);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy danh sách lịch hẹn'
        });
    }
};
exports.getSchedules = getSchedules;
/**
 * Lấy chi tiết lịch hẹn theo ID
 */
const getScheduleById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await scheduleService.getScheduleById(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy chi tiết lịch hẹn'
        });
    }
};
exports.getScheduleById = getScheduleById;
/**
 * Tạo lịch hẹn mới
 */
const createSchedule = async (req, res) => {
    try {
        const scheduleData = req.body;
        const result = await scheduleService.createSchedule(scheduleData);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi tạo lịch hẹn mới'
        });
    }
};
exports.createSchedule = createSchedule;
/**
 * Cập nhật lịch hẹn
 */
const updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const scheduleData = {
            id,
            ...req.body
        };
        const result = await scheduleService.updateSchedule(scheduleData);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật lịch hẹn'
        });
    }
};
exports.updateSchedule = updateSchedule;
/**
 * Xóa lịch hẹn
 */
const deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await scheduleService.deleteSchedule(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi xóa lịch hẹn'
        });
    }
};
exports.deleteSchedule = deleteSchedule;
/**
 * Cập nhật trạng thái lịch hẹn
 */
const updateScheduleStatus = async (req, res) => {
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
        const result = await scheduleService.updateScheduleStatus(id, status);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi cập nhật trạng thái lịch hẹn'
        });
    }
};
exports.updateScheduleStatus = updateScheduleStatus;
/**
 * Lấy lịch hẹn của một nhân viên trong khoảng thời gian
 */
const getStaffSchedules = async (req, res) => {
    try {
        const { staffId } = req.params;
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            res.status(400).json({
                success: false,
                message: 'Ngày bắt đầu và ngày kết thúc không được để trống'
            });
            return;
        }
        const result = await scheduleService.getStaffSchedules(staffId, startDate, endDate);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy lịch hẹn của nhân viên'
        });
    }
};
exports.getStaffSchedules = getStaffSchedules;
/**
 * Lấy lịch hẹn của một khách hàng
 */
const getCustomerSchedules = async (req, res) => {
    try {
        const { customerId } = req.params;
        const result = await scheduleService.getCustomerSchedules(customerId);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Lỗi không xác định khi lấy lịch hẹn của khách hàng'
        });
    }
};
exports.getCustomerSchedules = getCustomerSchedules;
exports.default = {
    getSchedules: exports.getSchedules,
    getScheduleById: exports.getScheduleById,
    createSchedule: exports.createSchedule,
    updateSchedule: exports.updateSchedule,
    deleteSchedule: exports.deleteSchedule,
    updateScheduleStatus: exports.updateScheduleStatus,
    getStaffSchedules: exports.getStaffSchedules,
    getCustomerSchedules: exports.getCustomerSchedules
};
