const mongoose = require('mongoose')
const ParentSchemaSymbolList = new mongoose.Schema({
  symbol: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 50,
    uppercase: true,
    required: 'Please enter a valid symbol, min 1 character'
  },
  qty: Number,
  avgPrice: { type: mongoose.Types.Decimal128 },
  date: {
    type: Date,
    default: Date.now
  }

})

module.exports.Portfolio = mongoose.model('Portfolio', ParentSchemaSymbolList)