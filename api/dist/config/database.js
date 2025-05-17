"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDBConnection = exports.closeDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nail-salon';
// Kết nối đến MongoDB
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('MongoDB đã kết nối thành công!');
    }
    catch (error) {
        console.error('Lỗi kết nối MongoDB:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
// Đóng kết nối DB khi tắt server
const closeDB = async () => {
    try {
        await mongoose_1.default.connection.close();
        console.log('MongoDB đã đóng kết nối');
    }
    catch (error) {
        console.error('Lỗi khi đóng kết nối MongoDB:', error);
        process.exit(1);
    }
};
exports.closeDB = closeDB;
// Kiểm tra trạng thái kết nối
const checkDBConnection = () => {
    return mongoose_1.default.connection.readyState === 1;
};
exports.checkDBConnection = checkDBConnection;
exports.default = { connectDB: exports.connectDB, closeDB: exports.closeDB, checkDBConnection: exports.checkDBConnection };
