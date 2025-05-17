"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Tắt kiểm tra nghiêm ngặt TypeScript khi phát triển trong ts-node
process.env.TS_NODE_TRANSPILE_ONLY = 'true';
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./config/routes"));
// Cấu hình môi trường
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nova-salon';
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// API Routes
app.use('/api', routes_1.default);
// Default route
app.get('/', (req, res) => {
    res.json({
        message: 'Chào mừng đến với Nova Salon API',
        version: '1.0.0',
        status: 'running'
    });
});
// Xử lý lỗi 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Không tìm thấy API yêu cầu',
        code: 404
    });
});
// Xử lý lỗi chung
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ nội bộ',
        code: 500
    });
});
// Kết nối MongoDB
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('Đã kết nối thành công đến MongoDB');
    // Khởi động server sau khi kết nối thành công
    app.listen(PORT, () => {
        console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Lỗi kết nối đến MongoDB:', error);
    process.exit(1);
});
exports.default = app;
