const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParentSchema = new mongoose.Schema({
  qtyPortfolio: {
    type: Number,
    required: true
  },
  // avgPrice: { type: mongoose.Types.Decimal128 },
  date: {
    type: Date,
    default: Date.now
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  symbol: { type: Schema.Types.ObjectId, ref: 'Stock', required: true }
});

ParentSchema.index({ userId: 1, symbol: 1 }, { unique: true });

module.exports.Portfolio = mongoose.model('Portfolio', ParentSchema);
