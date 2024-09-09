import mongoose, { Document, Schema } from 'mongoose';

interface IReport extends Document {
  courseId: string;         
  videoId: string;         
  reason: string;         
  additionalInfo?: string;  
  status: 'pending' | 'resolved'; 
  createdAt: Date;          
  updatedAt: Date;          
}

const reportSchema: Schema<IReport> = new Schema({
  courseId: { type: String, required: true },
  videoId: { type: String, required: true },
  reason: { type: String, required: true },
  additionalInfo: { type: String },
  status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Report = mongoose.model<IReport>('Report', reportSchema);

export default Report;
