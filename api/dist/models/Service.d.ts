import mongoose, { Document } from 'mongoose';
import { Service } from '../types/service';
export interface IServiceDocument extends Document, Omit<Service, 'id'> {
}
declare const ServiceModel: mongoose.Model<IServiceDocument, {}, {}, {}, mongoose.Document<unknown, {}, IServiceDocument, {}> & IServiceDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default ServiceModel;
