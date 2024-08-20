import { Schema, model, Document } from 'mongoose';

interface ICategory extends Document {
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { 
  timestamps: true,
});

const Category = model<ICategory>('Category', categorySchema);

export default Category;
