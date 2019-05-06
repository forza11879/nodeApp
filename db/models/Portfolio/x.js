const mongoose = require('mongoose');

const ChildSchemaData = new mongoose.Schema({
  _id: false,
  date: { type: mongoose.Types.Decimal128 },
  open: { type: mongoose.Types.Decimal128 },
  high: { type: mongoose.Types.Decimal128 },
  low: { type: mongoose.Types.Decimal128 },
  close: { type: mongoose.Types.Decimal128 },
  volume: { type: mongoose.Types.Decimal128 }
});

const ParentSchemaSymbol = new mongoose.Schema({
  _id: false,
  symbol: {
    type: String,
    unique: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
    uppercase: true,
    required: 'Please enter a valid symbol, min 1 character'
  },
  // Array of subdocuments
  data: [ChildSchemaData]
});

const ParentSchemaPortfolio = new mongoose.Schema({
  symbol: {
    type: String,
    unique: true
  },
  qtyPortfolio: Number,
  // avgPrice: { type: mongoose.Types.Decimal128 },
  date: {
    type: Date,
    default: Date.now
  },
  userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const ParentSchemaTransaction = new mongoose.Schema({
  symbol: {
    type: String,
    required: true
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  orderType: {
    type: String,
    required: true,
    lowercase: true,
    enum: ['buy', 'sell']
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const ParentSchemaUser = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExperation: Date,
  cash: {
    type: mongoose.Types.Decimal128,
    default: 50000.0
  },
  equity: {
    type: mongoose.Types.Decimal128,
    default: 50000.0
  }
});

module.exports.Symbol = mongoose.model('Symbol', ParentSchemaSymbol);
module.exports.Portfolio = mongoose.model('Portfolio', ParentSchemaPortfolio);
module.exports.Transaction = mongoose.model(
  'Transaction',
  ParentSchemaTransaction
);
module.exports.User = mongoose.model('User', ParentSchemaUser);
