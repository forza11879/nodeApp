const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParentSchema = new mongoose.Schema({
  // _id: { userId: 1, symbol: 1 }, //The _id field is always unique. That way you kind of get a composite primary key. Just be careful when creating these ids that the order of keys (a(userId) and b(symbol) in the example) matters, if you swap them around, it is considered a different object.
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
  // symbolId: { type: Schema.Types.ObjectId, ref: 'Stock', required: true },
  symbol: { type: String, required: true }
  // symbol: { type: Schema.Types.ObjectId, ref: 'Stock', required: true }
});

ParentSchema.index({ userId: 1, symbol: 1 }, { unique: true });

module.exports.Portfolio = mongoose.model('Portfolio', ParentSchema);
