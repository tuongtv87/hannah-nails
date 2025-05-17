"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCustomers = exports.deleteCustomer = exports.updateCustomer = exports.createCustomer = exports.getCustomerById = exports.getCustomers = void 0;
const Customer_1 = __importDefault(require("../models/Customer"));
/**
 * Lấy danh sách khách hàng với phân trang
 */
const getCustomers = async (params) => {
    try {
        const { page = 1, pageSize = 10, sortBy = 'createdAt', sortOrder = 'desc', name, email, phone } = params;
        // Tạo query
        const query = {};
        // Thêm các điều kiện lọc
        if (name)
            query.name = { $regex: name, $options: 'i' };
        if (email)
            query.email = { $regex: email, $options: 'i' };
        if (phone)
            query.phone = { $regex: phone, $options: 'i' };
        // Tính toán số lượng bản ghi bỏ qua
        const skip = (Number(page) - 1) * Number(pageSize);
        // Tạo đối tượng sort
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        // Thực hiện truy vấn đồng thời tổng số bản ghi và dữ liệu có phân trang
        const [total, customersRaw] = await Promise.all([
            Customer_1.default.countDocuments(query),
            Customer_1.default.find(query)
                .sort(sort)
                .skip(skip)
                .limit(Number(pageSize))
                .lean()
        ]);
        const customers = customersRaw.map((c) => ({ ...c, id: c._id.toString(), _id: undefined, __v: undefined }));
        // Tính tổng số trang
        const totalPages = Math.ceil(total / Number(pageSize));
        return {
            success: true,
            data: {
                items: customers,
                total,
                page: Number(page),
                pageSize: Number(pageSize),
                totalPages
            }
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi lấy danh sách khách hàng: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.getCustomers = getCustomers;
/**
 * Lấy chi tiết một khách hàng theo ID
 */
const getCustomerById = async (id) => {
    try {
        const customerRaw = await Customer_1.default.findById(id).lean();
        if (!customerRaw) {
            throw new Error('Không tìm thấy khách hàng');
        }
        const customer = { ...customerRaw, id: customerRaw._id.toString(), _id: undefined, __v: undefined };
        return {
            success: true,
            data: customer
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi lấy chi tiết khách hàng: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.getCustomerById = getCustomerById;
/**
 * Tạo một khách hàng mới
 */
const createCustomer = async (customerData) => {
    try {
        const customer = new Customer_1.default(customerData);
        const savedCustomerRaw = await customer.save();
        const savedCustomer = { ...savedCustomerRaw.toObject(), id: String(savedCustomerRaw._id), _id: undefined, __v: undefined };
        return {
            success: true,
            data: savedCustomer
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi tạo khách hàng mới: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.createCustomer = createCustomer;
/**
 * Cập nhật thông tin khách hàng
 */
const updateCustomer = async (customerData) => {
    try {
        const { id, ...updateData } = customerData;
        const customerRaw = await Customer_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();
        if (!customerRaw) {
            throw new Error('Không tìm thấy khách hàng');
        }
        const customer = { ...customerRaw, id: customerRaw._id.toString(), _id: undefined, __v: undefined };
        return {
            success: true,
            data: customer
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi cập nhật khách hàng: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.updateCustomer = updateCustomer;
/**
 * Xóa một khách hàng
 */
const deleteCustomer = async (id) => {
    try {
        const customerRaw = await Customer_1.default.findByIdAndDelete(id).lean();
        if (!customerRaw) {
            throw new Error('Không tìm thấy khách hàng');
        }
        const customer = { ...customerRaw, id: customerRaw._id.toString(), _id: undefined, __v: undefined };
        return {
            success: true,
            data: customer
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi xóa khách hàng: ${error instanceof Error ? error.message : String(error)}`);
    }
};
exports.deleteCustomer = deleteCustomer;
/**
 * Tìm kiếm khách hàng theo tên, email hoặc số điện thoại
 */
const searchCustomers = async (query) => {
    try {
        const customersRaw = await Customer_1.default.find({
            $text: { $search: query }
        }).limit(10).lean();
        const customers = customersRaw.map((c) => ({ ...c, id: c._id.toString(), _id: undefined, __v: undefined }));
        return {
            success: true,
            data: {
                items: customers,
                total: customers.length,
                page: 1,
                pageSize: 10,
                totalPages: 1
            }
        };
    }
    catch (error) {
        throw new Error(`Lỗi khi tìm kiếm khách hàng: ${error instanceof Error ? error.message : String(error)}`);
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
