const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const ParentSchemaSymbol = new mongoose.Schema({
  "_id": false,
  symbol: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 50,
    uppercase: true,
    required: 'Please enter a valid symbol, min 1 character'
  },
  open: { type: mongoose.Types.Decimal128 },
  high: { type: mongoose.Types.Decimal128 },
  low: { type: mongoose.Types.Decimal128 },
  price: { type: mongoose.Types.Decimal128 },
  volume: { type: mongoose.Types.Decimal128 },
  latestTrdDay: { type: mongoose.Types.Decimal128 },
  previousClose: { type: mongoose.Types.Decimal128 },
  change: { type: mongoose.Types.Decimal128 },
  changePercent: { type: mongoose.Types.Decimal128 }
})

const StockList = mongoose.model('StockList', ParentSchemaSymbol)
module.exports.StockList = StockList