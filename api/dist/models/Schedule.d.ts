import mongoose, { Document } from 'mongoose';
import { Schedule } from '../types/schedule';
export interface IScheduleDocument extends Document, Omit<Schedule, 'id'> {
}
declare const ScheduleModel: mongoose.Model<IScheduleDocument, {}, {}, {}, mongoose.Document<unknown, {}, IScheduleDocument, {}> & IScheduleDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any> & {
    checkTimeConflict(staffId: string, startTime: Date | string, endTime: Date | string): Promise<boolean>;
};
export default ScheduleModel;
