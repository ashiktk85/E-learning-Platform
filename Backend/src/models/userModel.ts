import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: Date;
  lastLogin: Date;
  tutor?: boolean;
  kyc: "Pending" | "verified" | "rejected";
  subscriptionId?: string;
  following: string[];
  followers: string[];
  referral?: string;
  isBlocked: boolean;
  tutorCredentials?: {
    email?: string;
    passwordHash?: string;
  };
  courses?: [];
  profile?: string;
}

const userSchema = new Schema<IUser>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  tutor: {
    type: Boolean,
    default: false,
  },
  subscriptionId: {
    type: String,
    ref: "Subscription",
  },
  kyc: {
    type: String,
    enum: ["Pending", "verified", "rejected"],
    default: "Pending",
  },
  following: {
    type: [String],
    default: [],
  },
  followers: {
    type: [String],
    default: [],
  },
  referral: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  tutorCredentials: {
    email: {
      type: String,
    },
    passwordHash: { type: String },
  },
  courses: {
    type: [String],
    default: [],
  },
  profile: {
    type: String,
  },
});

userSchema.index(
  { "tutorCredentials.tutorId": 1 },
  {
    unique: true,
    partialFilterExpression: {
      "tutorCredentials.tutorId": { $exists: true, $ne: null },
    },
  }
);

const userModel = model<IUser>("User", userSchema);

export default userModel;
