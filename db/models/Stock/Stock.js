const mongoose = require('mongoose')
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
    minlength: 1,
    maxlength: 50,
    uppercase: true,
    required: 'Please enter a valid symbol, min 1 character'
  },
  // Array of subdocuments
  data: [ChildSchemaData],
  slug: String

})

module.exports.Stock = mongoose.model('Stock', ParentSchemaSymbol)

// Mongoose assigns each of your schemas an _id field by default if one is not passed into the Schema constructor. The type assigned is an ObjectId to coincide with MongoDB's default behavior. If you don't want an _id added to your schema at all, you may disable it using this option.

// You can only use this option on subdocuments. Mongoose can't save a document without knowing its id, so you will get an error if you try to save a document without an _id.


// function validateStock(stock) {
//   const schema = {
//     symbol: Joi.string().min(2).max(50).required()
//   }
//   return Joi.validate(stock, schema)
// }

// module.exports.validateJoi = validateStock

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
