const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParentSchemaSymbolList = new mongoose.Schema({
  symbol: {
    type: String,
    unique: true
  },
  open: { type: mongoose.Types.Decimal128 },
  high: { type: mongoose.Types.Decimal128 },
  low: { type: mongoose.Types.Decimal128 },
  price: { type: mongoose.Types.Decimal128 },
  volume: { type: mongoose.Types.Decimal128 },
  latestTrdDay: { type: mongoose.Types.Decimal128 },
  previousClose: { type: mongoose.Types.Decimal128 },
  change: { type: mongoose.Types.Decimal128 },
  changePercent: { type: mongoose.Types.Decimal128 },
  userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});
module.exports.List = mongoose.model('List', ParentSchemaSymbolList);
