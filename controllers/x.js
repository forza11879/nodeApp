// const db = require('../db')

// exports.getWebApiList = (req, res) => {
//   (async function fetchDataList() {
//     try {
//       const urlArray = await db.generateUrlArray({}, { _id: 0 })
//       return res.send(urlArray)
//     } catch (ex) {
//       console.log(`fetchDataList error: ${ex}`)
//     }
//   })()
// }
// const { List } = require('./models/List')

// const generateUrlArray = (query, projection) => {
//   const dataFromDB = List.find(query, projection).select('symbol')
//   return linkArray = dataFromDB.map(item => {
//     return link = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${item.symbol}&apikey=6BUYSS9QR8Y9HH15`
//   })
// }

// module.exports = { generateUrlArray }


// const mongoose = require('mongoose')
// mongoose.Promise = global.Promise
// const ParentSchemaSymbolList = new mongoose.Schema({
//   symbol: String
// })

// module.exports.List = mongoose.model('List', ParentSchemaSymbolList)

