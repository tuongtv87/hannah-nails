// Tắt kiểm tra nghiêm ngặt TypeScript khi phát triển trong ts-node
process.env.TS_NODE_TRANSPILE_ONLY = 'true';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './config/routes';

// Cấu hình môi trường
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nova-salon';

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

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
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Lỗi máy chủ nội bộ',
    code: 500
  });
});

// Kết nối MongoDB
mongoose.connect(MONGODB_URI)
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

export default app; 