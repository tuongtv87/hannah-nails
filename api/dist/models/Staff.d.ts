import mongoose, { Document } from 'mongoose';
import { Staff } from '../types/staff';
export interface IStaffDocument extends Document, Omit<Staff, 'id'> {
}
declare const StaffModel: mongoose.Model<IStaffDocument, {}, {}, {}, mongoose.Document<unknown, {}, IStaffDocument, {}> & IStaffDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default StaffModel;
