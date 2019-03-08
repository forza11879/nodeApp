const mongoose = require('mongoose')
// mongoose.Promise = global.Promise
const axios = require('axios')
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
    required: 'Please enter a valid symbol, min 2 character'
  },
  // Array of subdocuments
  data: [ChildSchemaData],
  slug: String

})


// ParentSchemaSymbol.methods.fetchWebApi = async function (url) {
//   try {
//     const response = await axios.get(url)
//     return parsedData = await Object.keys(response.data['Time Series (Daily)']).map(date => {
//       return {
//         date: Date.parse(date),
//         open: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['1. open']) * 100) / 100,
//         high: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['2. high']) * 100) / 100,
//         low: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['3. low']) * 100) / 100,
//         close: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['4. close']) * 100) / 100,
//         volume: parseInt(response.data['Time Series (Daily)'][date]['5. volume'])
//       }
//     })
//   } catch (ex) {
//     console.log(`fetchWebApi error: ${ex}`)
//   }
// }



const Stock = mongoose.model('Stock', ParentSchemaSymbol)

// function validateStock(stock) {
//   const schema = {
//     symbol: Joi.string().min(2).max(50).required()
//   }
//   return Joi.validate(stock, schema)
// }


module.exports.Stock = Stock

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
