const mongoose = require('mongoose')
const ParentSchemaSymbolList = new mongoose.Schema({
  symbol: String,
  qty: Number,
  avgPrice: { type: mongoose.Types.Decimal128 },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports.Portfolio = mongoose.model('Portfolio', ParentSchemaSymbolList)