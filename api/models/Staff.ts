import mongoose, { Document, Schema } from 'mongoose';
import { Staff, StaffStatus, WorkingHours } from '../types/staff';

// Interface cho Staff document với MongoDB
export interface IStaffDocument extends Document, Omit<Staff, 'id'> {
  // Document đã có _id
}

// Schema cho WorkingHours
const workingHoursSchema = new Schema<WorkingHours>({
  day: { type: String, required: true, enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isWorkingDay: { type: Boolean, default: true }
}, { _id: false });

// Mặc định workingHours cho tất cả các ngày trong tuần
const defaultWorkingHours = [
  { day: 'mon', startTime: '09:00', endTime: '19:00', isWorkingDay: true },
  { day: 'tue', startTime: '09:00', endTime: '19:00', isWorkingDay: true },
  { day: 'wed', startTime: '09:00', endTime: '19:00', isWorkingDay: true },
  { day: 'thu', startTime: '09:00', endTime: '19:00', isWorkingDay: true },
  { day: 'fri', startTime: '09:00', endTime: '19:00', isWorkingDay: true },
  { day: 'sat', startTime: '09:00', endTime: '19:00', isWorkingDay: true },
  { day: 'sun', startTime: '09:00', endTime: '19:00', isWorkingDay: true }
];

// Schema cho Staff
const staffSchema = new Schema<IStaffDocument>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  wagesPerHour: { type: Number, required: true, min: 0 },
  avatar: { type: String, default: 'https://randomuser.me/api/portraits/lego/1.jpg' },
  status: { 
    type: String, 
    required: true, 
    enum: ['available', 'busy', 'off'],
    default: 'available'
  },
  skills: [{ type: String }],
  workingHours: {
    type: [workingHoursSchema],
    default: defaultWorkingHours
  }
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

// Tạo model
const StaffModel = mongoose.model<IStaffDocument>('Staff', staffSchema);

export default StaffModel; 