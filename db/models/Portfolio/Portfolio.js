// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const ChildSchemaData = new mongoose.Schema({
  _id: false,
  // date: { type: mongoose.Types.Decimal128 },
  date: { type: Number },
  open: { type: Number },
  high: { type: Number },
  low: { type: Number },
  close: { type: Number },
  volume: { type: Number },
});

const ParentSchema = new mongoose.Schema({
  qtyPortfolio: {
    type: Number,
    required: true,
  },
  avgPrice: { type: Number, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: { type: ObjectId, ref: 'User', required: true },
  symbolId: { type: ObjectId, ref: 'Stock', required: true },
  symbol: { type: String, required: true },
  data: ChildSchemaData,
});

ParentSchema.index({ userId: 1, symbolId: 1 }, { unique: true });

// Static method to remove Zero Position in portfolio
ParentSchema.statics.removeZeroPosition = async function(
  userId,
  symbolId,
  qtyPortfolio
) {
  try {
    const query = { userId, symbolId };
    if (qtyPortfolio === 0) {
      // console.log(`console Pre SAVE`.red);
      // console.log(`User ID ${userId}`.red);
      // console.log(`Symbol ID ${symbolId}`.red);

      await this.model('Portfolio').deleteOne(query);
    }
  } catch (err) {
    console.log(`removeZeroPosition error from Pre SAVE hook${err}`.red);
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
