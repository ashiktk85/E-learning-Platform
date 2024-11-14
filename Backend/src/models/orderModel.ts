import mongoose, { Document, Schema, model } from 'mongoose';
import { IOrder } from '../interfaces/common.interfaces';

const OrderSchema = new Schema<IOrder>({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
 
},
{ versionKey: false }
);



export default model<IOrder>('Order', OrderSchema);
