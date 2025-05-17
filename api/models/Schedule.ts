import mongoose, { Document, Schema } from 'mongoose';
import { Schedule, ScheduleStatus } from '../types/schedule';

// Interface cho Schedule document với MongoDB
export interface IScheduleDocument extends Document, Omit<Schedule, 'id'> {
  // Document đã có _id
}

// Schema cho Schedule
const scheduleSchema = new Schema<IScheduleDocument>({
  customerId: { 
    type: String,
    ref: 'Customer',
    required: true
  },
  staffId: { 
    type: String,
    ref: 'Staff',
    required: true
  },
  serviceId: { 
    type: String,
    ref: 'Service',
    required: true
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Working', 'Completed', 'Canceled'],
    default: 'Pending',
    required: true
  },
  notes: { type: String },
  createdAt: { type: String, default: () => new Date().toISOString() },
  updatedAt: { type: String, default: () => new Date().toISOString() }
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

// Tạo index cho hiệu suất truy vấn
scheduleSchema.index({ staffId: 1, startTime: 1, endTime: 1 });
scheduleSchema.index({ customerId: 1 });
scheduleSchema.index({ startTime: 1, endTime: 1 });
scheduleSchema.index({ status: 1 });

// Method kiểm tra trùng lịch
scheduleSchema.statics.checkTimeConflict = async function(
  staffId: string,
  startTime: Date | string,
  endTime: Date | string
): Promise<boolean> {
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  const conflictCount = await this.countDocuments({
    staffId,
    status: { $nin: ['Canceled'] },
    $or: [
      { startTime: { $lt: end, $gte: start } },
      { endTime: { $gt: start, $lte: end } },
      { $and: [{ startTime: { $lte: start } }, { endTime: { $gte: end } }] }
    ]
  });
  
  return conflictCount > 0;
};

// Tạo model
const ScheduleModel = mongoose.model<
  IScheduleDocument, 
  mongoose.Model<IScheduleDocument> & {
    checkTimeConflict(
      staffId: string,
      startTime: Date | string,
      endTime: Date | string
    ): Promise<boolean>
  }
>('Schedule', scheduleSchema);

export default ScheduleModel; 