import mongoose, { Document, Schema, model } from 'mongoose';

// Define the Order schema
const OrderSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Define the Order interface
interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  courseId: string;
  totalAmount: number;
  currency: string;
  paymentId: string;
  orderId: string;
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  createdAt: Date;
  updatedAt: Date;
}

export default model<IOrder>('Order', OrderSchema);
