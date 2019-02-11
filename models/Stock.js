const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Joi = require('joi')
const slug = require('slug')


const ChildSchemaData = new mongoose.Schema({
  "_id": false,
  date: { type: mongoose.Types.Decimal128 },
  open: { type: mongoose.Types.Decimal128 },
  high: { type: mongoose.Types.Decimal128 },
  low: { type: mongoose.Types.Decimal128 },
  close: { type: mongoose.Types.Decimal128 },
  volume: { type: mongoose.Types.Decimal128 }
})

const ParentSchemaSymbol = new mongoose.Schema({
  "_id": false,
  symbol: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 50,
    uppercase: true,
    required: 'Please enter a valid symbol, min 2 character'
  },
  // Array of subdocuments
  data: [ChildSchemaData],
  slug: String

})

const Stock = mongoose.model('Stock', ParentSchemaSymbol)

function validateStock(stock) {
  const schema = {
    symbol: Joi.string().min(2).max(50).required()
  }
  return Joi.validate(stock, schema)
}

module.exports.Stock = Stock
module.exports.validateJoi = validateStock

// //we have to PRE-save slug before save the parentSchemaSymbol into DB
// parentSchemaSymbol.pre('save', function (next) {
//   if (!this.isModified('symbol')) {
//     next()//skip it
//     return//stop this function from running
//   }
//   this.slug = slug(this.symbol)
//   next()
//   //TODO make more resiliant soslug are unique
// })
