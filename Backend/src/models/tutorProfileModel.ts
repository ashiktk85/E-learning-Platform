import mongoose, { Document, Schema } from 'mongoose';

interface ITutorProfile extends Document {
  userId: mongoose.Types.ObjectId; 
  email : string;
  profilePhotoUrl ?: string;
  role : string;
  country ?: string;
  language ?: String;
  bio: string;
  education : string;
  experience: string;
  // expertise: string[];
  socialLinks ?: {
    youtube?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  certifications?: {
    title: string;
    issuer: string;
    date: Date;
    certificateUrl: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const TutorProfileSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  email: {type: String, required: true},
  role: {type: String, required: true},
  country : {type :String},
  language : {type :String},
  profilePhotoUrl: { type: String},
  bio: { type: String, required: true },
  education: {type: String, required: true},
  experience: {type : String },
  // expertise: [{ type: String, required: true }],
  socialLinks: {
    youtube: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
  },
  certifications: [
    {
      title: { type: String, required: true },
      issuer: { type: String, required: true },
      date: { type: Date, required: true },
      certificateUrl: { type: String, required: true },
    },
  ],
}, {
  timestamps: true,
});

const TutorProfile = mongoose.model<ITutorProfile>('TutorProfile', TutorProfileSchema);

export default TutorProfile;
