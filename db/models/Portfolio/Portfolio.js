const colors = require('colors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParentSchema = new mongoose.Schema({
  // _id: { userId: 1, symbol: 1 }, //The _id field is always unique. That way you kind of get a composite primary key. Just be careful when creating these ids that the order of keys (a(userId) and b(symbol) in the example) matters, if you swap them around, it is considered a different object.
  qtyPortfolio: {
    type: Number,
    required: true
  },
  avgPrice: { type: Number, required: true },
  // avgPrice: { type: mongoose.Types.Decimal128, default: 0.0 },
  date: {
    type: Date,
    default: Date.now
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  symbolId: { type: Schema.Types.ObjectId, ref: 'Stock', required: true }
});

ParentSchema.index({ userId: 1, symbolId: 1 }, { unique: true });

// // Static method to remove Zero Position in portfolio
// ParentSchema.statics.removeZeroPosition = async function(userId, symbolId) {
//   try {
//     const query = { userId: userId, symbolId: symbolId };
//     const position = await this.model('Portfolio').findOne(query);
//     console.log(position.red);
//     if (position.qtyPortfolio === 0)
//       await this.model('Portfolio').deleteOne(query);
//     next();
//   } catch (err) {
//     console.error(`erro from removeZeroPosition${err}`.red);
//     console.log(`erro from removeZeroPosition${err}`.red);
//   }
// };
// // Call getAverageCost before remove
// ParentSchema.post('remove', function() {
//   this.constructor.removeZeroPosition(this.userId, this.symbolId);
// });

module.exports.Portfolio = mongoose.model('Portfolio', ParentSchema);
