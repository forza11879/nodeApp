const mongoose = require('mongoose')
const ParentSchemaSymbolList = new mongoose.Schema({
  // "_id": false,
  // symbol: {
  //   type: String,
  //   trim: true,
  //   minlength: 1,
  //   maxlength: 50,
  //   uppercase: true,
  //   required: 'Please enter a valid symbol, min 1 character'
  // },
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
  // open: Number,
  // high: Number,
  // low: Number,
  // price: Number,
  // volume: Number,
  // latestTrdDay: Number,
  // previousClose: Number,
  // change: Number,
  // changePercent: Number
})
module.exports.List = mongoose.model('List', ParentSchemaSymbolList)

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