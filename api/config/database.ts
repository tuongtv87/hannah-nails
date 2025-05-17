import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nail-salon';

// Kết nối đến MongoDB
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB đã kết nối thành công!');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error);
    process.exit(1);
  }
};

// Đóng kết nối DB khi tắt server
export const closeDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB đã đóng kết nối');
  } catch (error) {
    console.error('Lỗi khi đóng kết nối MongoDB:', error);
    process.exit(1);
  }
};

// Kiểm tra trạng thái kết nối
export const checkDBConnection = (): boolean => {
  return mongoose.connection.readyState === 1;
};

export default { connectDB, closeDB, checkDBConnection }; 