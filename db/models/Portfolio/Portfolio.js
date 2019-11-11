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

// Static method to remove Zero Position in portfolio
ParentSchema.statics.removeZeroPosition = async function(
  userId,
  symbolId,
  qtyPortfolio
) {
  try {
    const query = { userId: userId, symbolId: symbolId };
    if (qtyPortfolio === 0) {
      console.log(`console Pre SAVE`.red);
      console.log(`User ID ${userId}`.red);
      console.log(`Symbol ID ${symbolId}`.red);

      await this.model('Portfolio').deleteOne(query);
    }
  } catch (err) {
    console.log(`error from Pre SAVE hook${err}`.red);
  }
};

// Call removeZeroPosition before save
ParentSchema.pre('save', function() {
  this.constructor.removeZeroPosition(
    this.userId,
    this.symbolId,
    this.qtyPortfolio
  );
});

module.exports.Portfolio = mongoose.model('Portfolio', ParentSchema);
