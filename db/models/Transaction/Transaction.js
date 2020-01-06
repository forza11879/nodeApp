import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const ParentSchema = new mongoose.Schema(
  {
    price: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    orderType: {
      type: String,
      required: true,
      lowercase: true,
      enum: ['buy', 'sell'],
    },
    userId: { type: ObjectId, ref: 'User', required: true },
    symbolId: { type: ObjectId, ref: 'Stock', required: true },
    // symbol: { type: String, required: true }
  },
  { timestamps: true }
);

export const Transaction = mongoose.model('Transaction', ParentSchema);
