import mongoose, { Schema, Types, Document } from 'mongoose';


interface ICourse extends Document {
  courseId: string;
  email: string;
  name: string;
  description: string;
  category : string;
  sections: Types.ObjectId[];
  tags: string[];
  language: string;
  ratings?: Types.ObjectId[];
  comments?: Types.ObjectId[];
  thumbnail?: string;  
}


interface ISection extends Document {
  title: string;
  description?: string;
  videos: Types.ObjectId[];
}

interface IVideo extends Document {
  title: string;
  description?: string;
  videoUrl: string;
}

interface ISection extends Document {
  title: string;
  description?: string;
  videos: Types.ObjectId[];
}

const sectionSchema = new Schema<ISection>({
  title: {
    type: String,
    required: true,
  },
  description: String,
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
});


const courseSchema = new Schema<ICourse>({
  courseId: { 
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category : {
    type:  String,
    required : true
  },
  sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
  tags: [String],
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  thumbnail: {  
    type: String,
  },
});


const videoSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: true,
  },
  description: String,
  videoUrl: {
    type: String,
    required: true,
  },
});


const Course = mongoose.model<ICourse>('Course', courseSchema);
const Section = mongoose.model<ISection>('Section', sectionSchema);
const Video = mongoose.model<IVideo>('Video', videoSchema);

export { Course, Section, Video };