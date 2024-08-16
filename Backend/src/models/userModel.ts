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
   roles: string[];
   subscriptionId?: string;
   following: string[];
   followers: string[];
   referral?: string;
   isBlocked: boolean;
   tutorCredentials?: {
     tutorId: string;
     passwordHash: string;
   };
 }
 

 const userSchema = new Schema<IUser>({
   userId: { 
     type: String, 
     required: true,
     unique: true 
   },
   firstName: { 
     type: String, 
     required: true 
   },
   lastName: { 
     type: String,
     required: true 
   },
   email: { 
     type: String, 
     required: true, 
   },
   phone: { 
     type: String, 
     required: true 
   },
   passwordHash: {
      type: String, 
      required: true 
   },
   createdAt: {
      type: Date, 
      default: Date.now 
   },
   lastLogin: {
      type: Date 
   },
   roles: {
      type: [String], 
      default: ["Student"]
   },
   subscriptionId: {
      type: String, 
      ref: "Subscription" 
   },
   following: {
      type: [String], 
      default: [] 
   },
   followers: {
      type: [String], 
      default: [] 
   },
   referral: {
      type: String 
   },
   isBlocked: {
      type: Boolean, 
      default: false 
   },
   tutorCredentials: {
     tutorId: { type: String, unique: true },
     passwordHash: { type: String },
   },
 });
 
 const userModel = model<IUser>("User", userSchema);
 
 export default userModel;
 