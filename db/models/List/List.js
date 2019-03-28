const mongoose = require('mongoose')
const ParentSchemaSymbolList = new mongoose.Schema({
  symbol: String,
  open: { type: mongoose.Types.Decimal128 },
  high: { type: mongoose.Types.Decimal128 },
  low: { type: mongoose.Types.Decimal128 },
  price: { type: mongoose.Types.Decimal128 },
  volume: { type: mongoose.Types.Decimal128 },
  latestTrdDay: { type: mongoose.Types.Decimal128 },
  previousClose: { type: mongoose.Types.Decimal128 },
  change: { type: mongoose.Types.Decimal128 },
  changePercent: { type: mongoose.Types.Decimal128 }
  // open: Number
})
module.exports.List = mongoose.model('List', ParentSchemaSymbolList)

