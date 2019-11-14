const mongoose = require('mongoose');

const { Schema } = mongoose;
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
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    symbolId: { type: Schema.Types.ObjectId, ref: 'Stock', required: true },
    // symbol: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports.Transaction = mongoose.model('Transaction', ParentSchema);
