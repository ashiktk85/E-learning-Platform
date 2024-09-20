import mongoose, { Document, Schema } from 'mongoose';

interface IReport extends Document {
  reportId : string;
  courseId: string;         
  videoId: string;         
  reason: string;         
  additionalInfo?: string;  
  status: 'pending' | 'resolved'; 
  createdAt: Date;          
  updatedAt: Date;    
  tutorName : string;
  courseName : string;      
}

const reportSchema: Schema<IReport> = new Schema({
  reportId: { type: String, required: true },
  courseId: { type: String, required: true },
  videoId: { type: String, required: true },
  tutorName: { type: String, required: true },
  courseName: { type: String, required: true },
  reason: { type: String, required: true },
  additionalInfo: { type: String },
  status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Report = mongoose.model<IReport>('Report', reportSchema);

export default Report;