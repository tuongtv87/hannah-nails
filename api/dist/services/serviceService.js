"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchServices = exports.updateServiceStatus = exports.deleteService = exports.updateService = exports.createService = exports.getServiceById = exports.getServices = void 0;
const Service_1 = __importDefault(require("../models/Service"));
/**
 * Lấy danh sách dịch vụ với phân trang
 */
const getServices = async (params) => {
    try {
        const { page = 1, pageSize = 10, sortBy = 'createdAt', sortOrder = 'desc', name, category, isActive } = params;
        // Tạo query
        const query = {};
        // Thêm các điều kiện lọc
        if (name)
            query.name = { $regex: name, $options: 'i' };
        if (category)
            query.category = { $regex: category, $options: 'i' };
        if (typeof isActive === 'boolean')
            query.isActive = isActive;
        else if (typeof isActive === 'string')
            query.isActive = isActive === 'true';
        // Tính toán số lượng bản ghi bỏ qua
        const skip = (Number(page) - 1) * Number(pageSize);
        // Tạo đối tượng sort
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        // Thực hiện truy vấn đồng thời tổng số bản ghi và dữ liệu có phân trang
        const [total, servicesRaw] = await Promise.all([
            Service_1.default.countDocuments(query),
            Service_1.default.find(query)
                .sort(sort)
                .skip(skip)
                .limit(Number(pageSize))
                .lean()
        ]);
        const services = servicesRaw.map((s) => ({ ...s, id: s._id.toString(), _id: undefined, __v: undefined }));
        // Tính tổng số trang
        const totalPages = Math.ceil(total / Number(pageSize));
        return {
            success: true,
            data: {
                items: services,
                total,
                page: Number(page),
                pageSize: Number(pageSize),
                totalPages
            }
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi lấy danh sách dịch vụ: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.getServices = getServices;
/**
 * Lấy chi tiết một dịch vụ theo ID
 */
const getServiceById = async (id) => {
    try {
        const serviceRaw = await Service_1.default.findById(id).lean();
        if (!serviceRaw) {
            throw new Error('Không tìm thấy dịch vụ');
        }
        const service = { ...serviceRaw, id: serviceRaw._id.toString(), _id: undefined, __v: undefined };
        return {
            success: true,
            data: service
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi lấy chi tiết dịch vụ: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.getServiceById = getServiceById;
/**
 * Tạo một dịch vụ mới
 */
const createService = async (serviceData) => {
    try {
        const service = new Service_1.default(serviceData);
        const savedServiceRaw = await service.save();
        const savedService = { ...savedServiceRaw.toObject(), id: String(savedServiceRaw._id), _id: undefined, __v: undefined };
        return {
            success: true,
            data: savedService
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi tạo dịch vụ mới: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.createService = createService;
/**
 * Cập nhật thông tin dịch vụ
 */
const updateService = async (serviceData) => {
    try {
        const { id, ...updateData } = serviceData;
        const serviceRaw = await Service_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();
        if (!serviceRaw) {
            throw new Error('Không tìm thấy dịch vụ');
        }
        const service = { ...serviceRaw, id: serviceRaw._id.toString(), _id: undefined, __v: undefined };
        return {
            success: true,
            data: service
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi cập nhật dịch vụ: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.updateService = updateService;
/**
 * Xóa một dịch vụ
 */
const deleteService = async (id) => {
    try {
        const serviceRaw = await Service_1.default.findByIdAndDelete(id).lean();
        if (!serviceRaw) {
            throw new Error('Không tìm thấy dịch vụ');
        }
        const service = { ...serviceRaw, id: serviceRaw._id.toString(), _id: undefined, __v: undefined };
        return {
            success: true,
            data: service
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi xóa dịch vụ: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.deleteService = deleteService;
/**
 * Cập nhật trạng thái hoạt động của dịch vụ
 */
const updateServiceStatus = async (id, isActive) => {
    try {
        const serviceRaw = await Service_1.default.findByIdAndUpdate(id, { isActive }, { new: true, runValidators: true }).lean();
        if (!serviceRaw) {
            throw new Error('Không tìm thấy dịch vụ');
        }
        const service = { ...serviceRaw, id: serviceRaw._id.toString(), _id: undefined, __v: undefined };
        return {
            success: true,
            data: service
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi cập nhật trạng thái dịch vụ: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.updateServiceStatus = updateServiceStatus;
/**
 * Tìm kiếm dịch vụ theo tên, mô tả hoặc danh mục
 */
const searchServices = async (query) => {
    try {
        const servicesRaw = await Service_1.default.find({
            $text: { $search: query }
        }).limit(10).lean();
        const services = servicesRaw.map((s) => ({ ...s, id: s._id.toString(), _id: undefined, __v: undefined }));
        return {
            success: true,
            data: {
                items: services,
                total: services.length,
                page: 1,
                pageSize: 10,
                totalPages: 1
            }
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi tìm kiếm dịch vụ: ${error instanceof Error ? error.message : String(error)}`);
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
