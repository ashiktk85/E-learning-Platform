import { Schema, model } from 'mongoose';
import { IKyc } from '../interfaces/common.interfaces';

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
