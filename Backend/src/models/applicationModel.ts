import { Schema, model, Document } from 'mongoose';

interface FileUrl {
  type: string;
  url: string;
  signedUrl?: string; 
}

export interface ITutorApplication extends Document {
  applicationId: string;
  email: string;
  tutorRole: string;
  age: string;
  birthday: Date;
  gender: string;
  phone: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  graduationYear: string;
  teachingExperience: string;
  subjectsOfExpertise: string;
  socialLinks: Map<string, string>;
  files: FileUrl[];
  status: 'pending' | 'accepted' | 'rejected'; 
}

const tutorApplicationSchema = new Schema<ITutorApplication>(
  {
    applicationId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    tutorRole: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    graduationYear: {
      type: String,
      required: true,
    },
    teachingExperience: {
      type: String,
      required: true,
    },
    subjectsOfExpertise: {
      type: String,
      required: true,
    },
    socialLinks: {
      type: Map,
      of: String,
      default: {}, 
    },
    files: [
      {
        type: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        signedUrl: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending', 
    },
  },
  {
    timestamps: true, 
  }
);

const TutorApplication = model<ITutorApplication>('TutorApplication', tutorApplicationSchema);

export default TutorApplication;
