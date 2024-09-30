import mongoose, { Schema, Types } from "mongoose";

interface IRating extends Document {
  courseId: string; 
  userId: string;   
  ratingValue: number;       
  review: string;          
  createdAt: Date;           
}

const ratingSchema = new Schema<IRating>({
  courseId: {
    type: String,
    ref: 'Course',
    required: true,
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  ratingValue: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Rating = mongoose.model<IRating>('Rating', ratingSchema);
export default Rating;