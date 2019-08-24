const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const ParentSchemaSymbolList = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true, // Unique index. If you specify `unique: true`
    // specifying `index: true` is optional if you do `unique: true`
    lowercase: true,
    validate: value => {
      return validator.isEmail(value);
    }
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
    type: mongoose.Types.Decimal128
  }
});

module.exports.User = mongoose.model('User', ParentSchemaSymbolList);
