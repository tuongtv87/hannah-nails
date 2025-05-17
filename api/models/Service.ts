import mongoose, { Document, Schema } from 'mongoose';
import { Service } from '../types/service';

// Interface cho Service document với MongoDB
export interface IServiceDocument extends Document, Omit<Service, 'id'> {
  // Document đã có _id
}

// Schema cho Service
const serviceSchema = new Schema<IServiceDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // thời gian thực hiện (phút)
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true, // Tự động thêm createdAt và updatedAt
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Tạo index cho tìm kiếm
serviceSchema.index({ name: 'text', description: 'text', category: 'text' });

// Tạo model
const ServiceModel = mongoose.model<IServiceDocument>('Service', serviceSchema);

export default ServiceModel; 