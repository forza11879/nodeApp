const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const ParentSchemaSymbolList = new mongoose.Schema({
//   symbol: {
//     type: String,
//     unique: true
//   },
//   open: { type: mongoose.Types.Decimal128 },
//   high: { type: mongoose.Types.Decimal128 },
//   low: { type: mongoose.Types.Decimal128 },
//   price: { type: mongoose.Types.Decimal128 },
//   volume: { type: mongoose.Types.Decimal128 },
//   latestTrdDay: { type: mongoose.Types.Decimal128 },
//   previousClose: { type: mongoose.Types.Decimal128 },
//   change: { type: mongoose.Types.Decimal128 },
//   changePercent: { type: mongoose.Types.Decimal128 },
//   userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
// });

// const ChildSchemaData = new mongoose.Schema({
//   _id: false,
//   open: { type: mongoose.Types.Decimal128 },
//   high: { type: mongoose.Types.Decimal128 },
//   low: { type: mongoose.Types.Decimal128 },
//   price: { type: mongoose.Types.Decimal128 },
//   volume: { type: mongoose.Types.Decimal128 },
//   latestTrdDay: { type: mongoose.Types.Decimal128 },
//   previousClose: { type: mongoose.Types.Decimal128 },
//   change: { type: mongoose.Types.Decimal128 },
//   changePercent: { type: mongoose.Types.Decimal128 }
// });

const ChildSchemaData = new mongoose.Schema({
  _id: false,
  symbol: {
    type: String,
    unique: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
    uppercase: true,
    require: true,
    sparse: true // need to look into it
    // https://stackoverflow.com/questions/24430220/e11000-duplicate-key-error-index-in-mongodb-mongoose
  }
});

const ParentSchema = new mongoose.Schema({
  // _id: false,
  // Array of subdocuments
  data: [ChildSchemaData],
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

ParentSchema.index({ userId: 1 }, { unique: true });

module.exports.List = mongoose.model('List', ParentSchema);
