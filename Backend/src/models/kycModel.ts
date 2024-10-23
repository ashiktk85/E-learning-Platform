import { Schema, model, Document } from 'mongoose';


interface IKyc extends Document {
  userId: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  accountType: 'savings' | 'current';
  ifscCode: string;
  branchName?: string;
  currency: string;
  panCard?: string;
}


const kycSchema = new Schema<IKyc>({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  accountHolderName: {
    type: String,
    required: true,
    trim: true
  },
  bankName: {
    type: String,
    required: true,
    trim: true
  },
  accountNumber: {
    type: String,
    required: true,
    trim: true
  },
  accountType: {
    type: String,
    enum: ['savings', 'current'],
    required: true
  },
  ifscCode: {
    type: String,
    required: true,
    trim: true
  },
  branchName: {
    type: String,
    trim: true
  },
  currency: {
    type: String,
    required: true,
    trim: true
  },
  panCard: {
    type: String,
    trim: true
  }
}, { timestamps: true });


const KycModel = model<IKyc>('Kyc', kycSchema);

export default KycModel;
