const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const ParentSchemaSymbolList = new mongoose.Schema({
  "_id": false,
  symbol: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 50,
    uppercase: true,
    required: 'Please enter a valid symbol, min 1 character'
  },
  open: Number,
  high: Number,
  low: Number,
  price: Number,
  volume: Number,
  latestTrdDay: Number,
  previousClose: Number,
  change: Number,
  changePercent: Number
})
const List = mongoose.model('List', ParentSchemaSymbolList)
module.exports.List = List

// const ChildSchemaData = new mongoose.Schema({
//   "_id": false,
//   open: { type: mongoose.Types.Decimal128 },
//   high: { type: mongoose.Types.Decimal128 },
//   low: { type: mongoose.Types.Decimal128 },
//   price: { type: mongoose.Types.Decimal128 },
//   volume: { type: mongoose.Types.Decimal128 },
//   latestTrdDay: { type: mongoose.Types.Decimal128 },
//   previousClose: { type: mongoose.Types.Decimal128 },
//   change: { type: mongoose.Types.Decimal128 },
//   changePercent: { type: mongoose.Types.Decimal128 }
// })