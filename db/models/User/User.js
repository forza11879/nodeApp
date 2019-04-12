const mongoose = require('mongoose')
const ParentSchemaSymbolList = new mongoose.Schema({
  email: String,
  name: {
    type: String,
    default: 'Andrei Luca'
  },
  password: String,
  cash: { 
    type: mongoose.Types.Decimal128,
    default: 50000.00 
  },
  equity: { 
    type: mongoose.Types.Decimal128,
    default: null
   }
})

module.exports.User = mongoose.model('User', ParentSchemaSymbolList)