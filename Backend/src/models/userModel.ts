import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/common.interfaces";



const userSchema = new Schema<IUser>({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim : true,
  },
  firstName: {
    type: String,
    required: true,
    trim : true,
  },
  lastName: {
    type: String,
    required: true,
    trim : true,
  },
  email: {
    type: String,
    required: true,
    trim : true,
  },
  phone: {
    type: String,
    required: true,
    trim : true,
  },
  passwordHash: {
    type: String,
    required: true,
    trim : true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    trim : true,
  },
  lastLogin: {
    type: Date,
    trim : true,
  },
  tutor: {
    type: Boolean,
    default: false,
    trim : true,
  },
  subscriptionId: {
    type: String,
    ref: "Subscription",
    trim : true,
  },
  kyc: {
    type: String,
    enum: ["Pending", "verified", "rejected"],
    default: "Pending",
    trim : true,
  },
  following: {
    type: [String],
    default: [],
    trim : true,
  },
  followers: {
    type: [String],
    default: [],
    trim : true,
  },
  referral: {
    type: String,
    trim : true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
    trim : true,
  },
  tutorCredentials: {
    email: {
      type: String,
      trim : true,
    },
    passwordHash: { type: String, trim : true },
  },
  courses: {
    type: [String],
    default: [],
  },
  profile: {
    type: String,
    trim : true,
  },
});

userSchema.index(
  { "tutorCredentials.email": 1 },
  {
    unique: true,
    partialFilterExpression: {
      "tutorCredentials.email": { $exists: true, $ne: null },
    },
  }
);

const userModel = model<IUser>("User", userSchema);

export default userModel;
