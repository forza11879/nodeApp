const mongoose = require('mongoose');
const ParentSchemaSymbolList = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
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

module.exports.User = mongoose.model('User', ParentSchemaSymbolList);
