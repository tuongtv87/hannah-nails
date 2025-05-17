import mongoose, { Document, Schema } from 'mongoose';
import { Customer } from '../types/customer';

// Interface cho Customer document với MongoDB
export interface ICustomerDocument extends Document, Omit<Customer, 'id'> {
  // Document đã có _id
}

// Schema cho Customer
const customerSchema = new Schema<ICustomerDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  avatar: { type: String, default: 'https://randomuser.me/api/portraits/lego/5.jpg' },
  address: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastVisit: { type: String },
  totalVisits: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 }
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
customerSchema.index({ name: 'text', email: 'text', phone: 'text' });

// Tạo model
const CustomerModel = mongoose.model<ICustomerDocument>('Customer', customerSchema);

export default CustomerModel; 