"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerSchedules = exports.getStaffSchedules = exports.updateScheduleStatus = exports.deleteSchedule = exports.updateSchedule = exports.createSchedule = exports.getScheduleById = exports.getSchedules = void 0;
const Schedule_1 = __importDefault(require("../models/Schedule"));
/**
 * Lấy danh sách lịch hẹn với phân trang
 */
const getSchedules = async (params) => {
    try {
        const { page = 1, pageSize = 10, sortBy = 'startTime', sortOrder = 'desc', customerId, staffId, serviceId, status, startDate, endDate } = params;
        // Tạo query
        const query = {};
        // Thêm các điều kiện lọc
        if (customerId)
            query.customerId = customerId;
        if (staffId)
            query.staffId = staffId;
        if (serviceId)
            query.serviceId = serviceId;
        if (status)
            query.status = status;
        // Lọc theo khoảng thời gian
        if (startDate || endDate) {
            query.startTime = {};
            if (startDate) {
                query.startTime.$gte = new Date(startDate);
            }
            if (endDate) {
                query.startTime.$lte = new Date(endDate);
            }
        }
        // Tính toán số lượng bản ghi bỏ qua
        const skip = (Number(page) - 1) * Number(pageSize);
        // Tạo đối tượng sort
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        // Thực hiện truy vấn đồng thời tổng số bản ghi và dữ liệu có phân trang
        const [total, schedulesRaw] = await Promise.all([
            Schedule_1.default.countDocuments(query),
            Schedule_1.default.find(query)
                .sort(sort)
                .skip(skip)
                .limit(Number(pageSize))
                .populate('customerId', 'name email phone avatar')
                .populate('staffId', 'name position avatar')
                .populate('serviceId', 'name duration price')
                .lean()
        ]);
        const schedules = schedulesRaw.map((s) => {
            const result = {
                ...s,
                id: s._id.toString(),
                _id: undefined,
                __v: undefined
            };
            if (s.customerId && typeof s.customerId === 'object' && s.customerId._id) {
                result.customerId = { ...s.customerId, id: String(s.customerId._id) };
                delete result.customerId._id;
            }
            if (s.staffId && typeof s.staffId === 'object' && s.staffId._id) {
                result.staffId = { ...s.staffId, id: String(s.staffId._id) };
                delete result.staffId._id;
            }
            if (s.serviceId && typeof s.serviceId === 'object' && s.serviceId._id) {
                result.serviceId = { ...s.serviceId, id: String(s.serviceId._id) };
                delete result.serviceId._id;
            }
            return result;
        });
        // Tính tổng số trang
        const totalPages = Math.ceil(total / Number(pageSize));
        return {
            success: true,
            data: {
                items: schedules,
                total,
                page: Number(page),
                pageSize: Number(pageSize),
                totalPages
            }
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi lấy danh sách lịch hẹn: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.getSchedules = getSchedules;
/**
 * Lấy chi tiết một lịch hẹn theo ID
 */
const getScheduleById = async (id) => {
    try {
        const scheduleRaw = await Schedule_1.default.findById(id)
            .populate('customerId', 'name email phone avatar')
            .populate('staffId', 'name position avatar')
            .populate('serviceId', 'name duration price')
            .lean();
        if (!scheduleRaw) {
            throw new Error('Không tìm thấy lịch hẹn');
        }
        // Chuyển đổi document thành plain object
        const schedule = {
            ...scheduleRaw,
            id: String(scheduleRaw._id),
            customerId: scheduleRaw.customerId,
            staffId: scheduleRaw.staffId,
            serviceId: scheduleRaw.serviceId
        };
        // Xóa các trường không cần thiết
        delete schedule._id;
        delete schedule.__v;
        return {
            success: true,
            data: schedule
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi lấy chi tiết lịch hẹn: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.getScheduleById = getScheduleById;
/**
 * Tạo một lịch hẹn mới
 */
const createSchedule = async (scheduleData) => {
    try {
        // Kiểm tra xung đột thời gian 
        const hasConflict = await Schedule_1.default.checkTimeConflict(scheduleData.staffId, new Date(scheduleData.startTime), new Date(scheduleData.endTime));
        if (hasConflict) {
            throw new Error('Thời gian này đã được đặt');
        }
        const schedule = new Schedule_1.default(scheduleData);
        const savedScheduleRaw = await schedule.save();
        const populatedScheduleRaw = await Schedule_1.default.findById(savedScheduleRaw._id)
            .populate('customerId', 'name email phone avatar')
            .populate('staffId', 'name position avatar')
            .populate('serviceId', 'name duration price')
            .lean();
        // Kiểm tra và chắc chắn populatedScheduleRaw không null trước khi sử dụng
        if (!populatedScheduleRaw) {
            throw new Error('Không thể lấy chi tiết lịch hẹn sau khi lưu');
        }
        // Chuyển đổi document thành plain object một cách an toàn
        const populatedSchedule = {
            ...populatedScheduleRaw,
            id: String(populatedScheduleRaw._id),
            customerId: populatedScheduleRaw.customerId,
            staffId: populatedScheduleRaw.staffId,
            serviceId: populatedScheduleRaw.serviceId
        }; // Sử dụng any để tránh lỗi TypeScript
        // Xóa các trường không cần thiết
        if (populatedSchedule._id)
            delete populatedSchedule._id;
        if (populatedSchedule.__v !== undefined)
            delete populatedSchedule.__v;
        return {
            success: true,
            data: populatedSchedule
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi tạo lịch hẹn mới: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.createSchedule = createSchedule;
/**
 * Cập nhật thông tin lịch hẹn
 */
const updateSchedule = async (scheduleData) => {
    try {
        const { id, ...updateData } = scheduleData;
        // Kiểm tra xung đột thời gian nếu cập nhật thời gian
        if (updateData.startTime && updateData.endTime) {
            const staffId = updateData.staffId || (await Schedule_1.default.findById(id)).staffId;
            const hasConflict = await Schedule_1.default.checkTimeConflict(staffId, new Date(updateData.startTime), new Date(updateData.endTime));
            if (hasConflict) {
                throw new Error('Thời gian này đã được đặt');
            }
        }
        const scheduleRaw = await Schedule_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate('customerId', 'name email phone avatar')
            .populate('staffId', 'name position avatar')
            .populate('serviceId', 'name duration price')
            .lean();
        if (!scheduleRaw) {
            throw new Error('Không tìm thấy lịch hẹn');
        }
        // Chuyển đổi document thành plain object
        const schedule = {
            ...scheduleRaw,
            id: String(scheduleRaw._id),
            customerId: scheduleRaw.customerId,
            staffId: scheduleRaw.staffId,
            serviceId: scheduleRaw.serviceId
        };
        // Xóa các trường không cần thiết
        delete schedule._id;
        delete schedule.__v;
        return {
            success: true,
            data: schedule
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi cập nhật lịch hẹn: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.updateSchedule = updateSchedule;
/**
 * Xóa một lịch hẹn
 */
const deleteSchedule = async (id) => {
    try {
        const scheduleRaw = await Schedule_1.default.findByIdAndDelete(id).lean();
        if (!scheduleRaw) {
            throw new Error('Không tìm thấy lịch hẹn');
        }
        // Chuyển đổi document thành plain object
        const schedule = {
            ...scheduleRaw,
            id: String(scheduleRaw._id),
            customerId: scheduleRaw.customerId,
            staffId: scheduleRaw.staffId,
            serviceId: scheduleRaw.serviceId
        };
        // Xóa các trường không cần thiết
        delete schedule._id;
        delete schedule.__v;
        return {
            success: true,
            data: schedule
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi xóa lịch hẹn: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.deleteSchedule = deleteSchedule;
/**
 * Cập nhật trạng thái của lịch hẹn
 */
const updateScheduleStatus = async (id, status) => {
    try {
        const scheduleRaw = await Schedule_1.default.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).populate('customerId', 'name email phone avatar')
            .populate('staffId', 'name position avatar')
            .populate('serviceId', 'name duration price')
            .lean();
        if (!scheduleRaw) {
            throw new Error('Không tìm thấy lịch hẹn');
        }
        // Chuyển đổi document thành plain object
        const schedule = {
            ...scheduleRaw,
            id: String(scheduleRaw._id),
            customerId: scheduleRaw.customerId,
            staffId: scheduleRaw.staffId,
            serviceId: scheduleRaw.serviceId
        };
        // Xóa các trường không cần thiết
        delete schedule._id;
        delete schedule.__v;
        return {
            success: true,
            data: schedule
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi cập nhật trạng thái lịch hẹn: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.updateScheduleStatus = updateScheduleStatus;
/**
 * Lấy lịch hẹn của một nhân viên trong khoảng thời gian
 */
const getStaffSchedules = async (staffId, startDate, endDate) => {
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const schedulesRaw = await Schedule_1.default.find({
            staffId,
            startTime: { $gte: start, $lte: end }
        }).sort('startTime')
            .populate('customerId', 'name email phone avatar')
            .populate('staffId', 'name position avatar')
            .populate('serviceId', 'name duration price')
            .lean();
        const schedules = schedulesRaw.map((s) => {
            const result = {
                ...s,
                id: s._id.toString(),
                _id: undefined,
                __v: undefined
            };
            if (s.customerId && typeof s.customerId === 'object' && s.customerId._id) {
                result.customerId = { ...s.customerId, id: String(s.customerId._id) };
                delete result.customerId._id;
            }
            if (s.staffId && typeof s.staffId === 'object' && s.staffId._id) {
                result.staffId = { ...s.staffId, id: String(s.staffId._id) };
                delete result.staffId._id;
            }
            if (s.serviceId && typeof s.serviceId === 'object' && s.serviceId._id) {
                result.serviceId = { ...s.serviceId, id: String(s.serviceId._id) };
                delete result.serviceId._id;
            }
            return result;
        });
        return {
            success: true,
            data: {
                items: schedules,
                total: schedules.length,
                page: 1,
                pageSize: schedules.length,
                totalPages: 1
            }
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi lấy lịch hẹn của nhân viên: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.getStaffSchedules = getStaffSchedules;
/**
 * Lấy lịch hẹn của một khách hàng
 */
const getCustomerSchedules = async (customerId) => {
    try {
        const schedulesRaw = await Schedule_1.default.find({ customerId })
            .sort('-startTime')
            .populate('customerId', 'name email phone avatar')
            .populate('staffId', 'name position avatar')
            .populate('serviceId', 'name duration price')
            .lean();
        const schedules = schedulesRaw.map((s) => {
            const result = {
                ...s,
                id: s._id.toString(),
                _id: undefined,
                __v: undefined
            };
            if (s.customerId && typeof s.customerId === 'object' && s.customerId._id) {
                result.customerId = { ...s.customerId, id: String(s.customerId._id) };
                delete result.customerId._id;
            }
            if (s.staffId && typeof s.staffId === 'object' && s.staffId._id) {
                result.staffId = { ...s.staffId, id: String(s.staffId._id) };
                delete result.staffId._id;
            }
            if (s.serviceId && typeof s.serviceId === 'object' && s.serviceId._id) {
                result.serviceId = { ...s.serviceId, id: String(s.serviceId._id) };
                delete result.serviceId._id;
            }
            return result;
        });
        return {
            success: true,
            data: {
                items: schedules,
                total: schedules.length,
                page: 1,
                pageSize: schedules.length,
                totalPages: 1
            }
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi lấy lịch hẹn của khách hàng: ${error instanceof Error ? error.message : String(error)}`);
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
