import mongoose, { Document } from 'mongoose';
import { Customer } from '../types/customer';
export interface ICustomerDocument extends Document, Omit<Customer, 'id'> {
}
declare const CustomerModel: mongoose.Model<ICustomerDocument, {}, {}, {}, mongoose.Document<unknown, {}, ICustomerDocument, {}> & ICustomerDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default CustomerModel;
