
import mongoose, { Schema, Document, Types } from 'mongoose';

interface IRating extends Document {
  userId: Types.ObjectId; 
  value: number; 
  createdAt: Date;
}

const ratingSchema = new Schema<IRating>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  value: {
    type: Number,
    required: true,
    min: 1, 
    max: 5, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Rating = mongoose.model<IRating>('Rating', ratingSchema);

export { Rating, IRating };
