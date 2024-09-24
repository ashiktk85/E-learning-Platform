import { Document, Schema, model } from 'mongoose';

interface ITransaction {
  amount: number;
  transactionId : string;
  transactionType: 'credit' | 'debit';
  date?: Date;
}

export interface IWallet extends Document {
  userId: string;
  balance: number;
  transactions: ITransaction[];
  createdAt?: Date;
  updatedAt?: Date;
}

const transactionSchema = new Schema<ITransaction>({
  amount: { type: Number, required: true },
  transactionId : {type : String , required : true},
  transactionType: { type: String, enum: ['credit', 'debit'], required: true },
  date: { type: Date, default: Date.now },
});

const walletSchema = new Schema<IWallet>(
  {
    userId: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 },
    transactions: [transactionSchema],
  },
  { timestamps: true }
);

export const Wallet = model<IWallet>('Wallet', walletSchema);
