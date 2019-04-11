const mongoose = require('mongoose')
const ParentSchemaSymbolList = new mongoose.Schema({
  symbol: String,
  price: { type: mongoose.Types.Decimal128 },
  qty: Number,
  orderType: {
    type: String,
    required: true,
    lowercase: true,
    enum: ['Buy', 'Sell']
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports.Transaction = mongoose.model('Transaction', ParentSchemaSymbolList)