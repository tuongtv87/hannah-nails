"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableStaffs = exports.updateStaffWorkingHours = exports.getStaffWorkingHours = exports.updateStaffStatus = exports.deleteStaff = exports.updateStaff = exports.createStaff = exports.getStaffById = exports.getStaffs = void 0;
const Staff_1 = __importDefault(require("../models/Staff"));
/**
 * Lấy danh sách nhân viên với phân trang
 */
const getStaffs = async (params) => {
    try {
        const { page = 1, pageSize = 10, sortBy = 'createdAt', sortOrder = 'desc', name, position, status, skills } = params;
        // Tạo query
        const query = {};
        // Thêm các điều kiện lọc
        if (name)
            query.name = { $regex: name, $options: 'i' };
        if (position)
            query.position = { $regex: position, $options: 'i' };
        if (status)
            query.status = status;
        if (skills)
            query.skills = { $in: [skills] };
        // Tính toán số lượng bản ghi bỏ qua
        const skip = (Number(page) - 1) * Number(pageSize);
        // Tạo đối tượng sort
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        // Thực hiện truy vấn đồng thời tổng số bản ghi và dữ liệu có phân trang
        const [total, staffsRaw] = await Promise.all([
            Staff_1.default.countDocuments(query),
            Staff_1.default.find(query)
                .sort(sort)
                .skip(skip)
                .limit(Number(pageSize))
                .lean()
        ]);
        const staffs = staffsRaw.map((s) => ({ ...s, id: s._id.toString(), _id: undefined, __v: undefined }));
        // Tính tổng số trang
        const totalPages = Math.ceil(total / Number(pageSize));
        return {
            success: true,
            data: {
                items: staffs,
                total,
                page: Number(page),
                pageSize: Number(pageSize),
                totalPages
            }
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi lấy danh sách nhân viên: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.getStaffs = getStaffs;
/**
 * Lấy chi tiết một nhân viên theo ID
 */
const getStaffById = async (id) => {
    try {
        const staffRaw = await Staff_1.default.findById(id).lean();
        if (!staffRaw) {
            throw new Error('Không tìm thấy nhân viên');
        }
        const staff = { ...staffRaw, id: staffRaw._id.toString(), _id: undefined, __v: undefined };
        return {
            success: true,
            data: staff
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi lấy chi tiết nhân viên: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.getStaffById = getStaffById;
/**
 * Tạo một nhân viên mới
 */
const createStaff = async (staffData) => {
    try {
        const staff = new Staff_1.default(staffData);
        const savedStaffRaw = await staff.save();
        const savedStaff = { ...savedStaffRaw.toObject(), id: String(savedStaffRaw._id), _id: undefined, __v: undefined };
        return {
            success: true,
            data: savedStaff
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi tạo nhân viên mới: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.createStaff = createStaff;
/**
 * Cập nhật thông tin nhân viên
 */
const updateStaff = async (staffData) => {
    try {
        const { id, ...updateData } = staffData;
        const staffRaw = await Staff_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();
        if (!staffRaw) {
            throw new Error('Không tìm thấy nhân viên');
        }
        const staff = { ...staffRaw, id: staffRaw._id.toString(), _id: undefined, __v: undefined };
        return {
            success: true,
            data: staff
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi cập nhật nhân viên: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.updateStaff = updateStaff;
/**
 * Xóa một nhân viên
 */
const deleteStaff = async (id) => {
    try {
        const staffRaw = await Staff_1.default.findByIdAndDelete(id).lean();
        if (!staffRaw) {
            throw new Error('Không tìm thấy nhân viên');
        }
        const staff = { ...staffRaw, id: staffRaw._id.toString(), _id: undefined, __v: undefined };
        return {
            success: true,
            data: staff
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi xóa nhân viên: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.deleteStaff = deleteStaff;
/**
 * Cập nhật trạng thái của nhân viên
 */
const updateStaffStatus = async (id, status) => {
    try {
        const staffRaw = await Staff_1.default.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).lean();
        if (!staffRaw) {
            throw new Error('Không tìm thấy nhân viên');
        }
        const staff = { ...staffRaw, id: staffRaw._id.toString(), _id: undefined, __v: undefined };
        return {
            success: true,
            data: staff
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi cập nhật trạng thái nhân viên: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.updateStaffStatus = updateStaffStatus;
/**
 * Lấy lịch làm việc của nhân viên
 */
const getStaffWorkingHours = async (id) => {
    try {
        const staffRaw = await Staff_1.default.findById(id).lean();
        if (!staffRaw) {
            throw new Error('Không tìm thấy nhân viên');
        }
        const staff = { ...staffRaw, id: staffRaw._id.toString(), _id: undefined, __v: undefined };
        return {
            success: true,
            data: staff
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi lấy lịch làm việc của nhân viên: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.getStaffWorkingHours = getStaffWorkingHours;
/**
 * Cập nhật lịch làm việc của nhân viên
 */
const updateStaffWorkingHours = async (id, workingHours) => {
    try {
        const staffRaw = await Staff_1.default.findByIdAndUpdate(id, { workingHours }, { new: true, runValidators: true }).lean();
        if (!staffRaw) {
            throw new Error('Không tìm thấy nhân viên');
        }
        const staff = { ...staffRaw, id: staffRaw._id.toString(), _id: undefined, __v: undefined };
        return {
            success: true,
            data: staff
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi cập nhật lịch làm việc: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.updateStaffWorkingHours = updateStaffWorkingHours;
/**
 * Lấy danh sách nhân viên có sẵn trong khoảng thời gian
 */
const getAvailableStaffs = async (date, startTime, endTime) => {
    try {
        const startDate = new Date(date + 'T' + startTime);
        const endDate = new Date(date + 'T' + endTime);
        // Lấy tất cả nhân viên đang hoạt động
        const staffs = await Staff_1.default.find({ status: 'available' });
        // Import model Schedule để kiểm tra lịch trình
        const ScheduleModel = require('../models/Schedule').default;
        // Lọc những nhân viên không có lịch trùng
        const availableStaffs = [];
        for (const staff of staffs) {
            const hasConflict = await ScheduleModel.checkTimeConflict(staff._id, startDate, endDate);
            if (!hasConflict) {
                availableStaffs.push({
                    ...staff.toObject(),
                    id: String(staff._id),
                    _id: undefined,
                    __v: undefined
                });
            }
        }
        return {
            success: true,
            data: {
                items: availableStaffs,
                total: availableStaffs.length,
                page: 1,
                pageSize: availableStaffs.length,
                totalPages: 1
            }
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi lấy danh sách nhân viên có sẵn: ${error instanceof Error ? error.message : String(error)}`);
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
