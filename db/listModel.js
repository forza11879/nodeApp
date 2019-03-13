const { List } = require('./models/List')

// const saveToDb = arg => {
//   const stockList = new List({
//     symbol: arg.symbol,
//     open: arg.open,
//     high: arg.high,
//     low: arg.low,
//     price: arg.price,
//     volume: arg.volume,
//     latestTrdDay: arg.latestTrdDay,
//     previousClose: arg.previousClose,
//     change: arg.change,
//     changePercent: arg.changePercent
//   })

//   const query = { symbol: `${stockList.symbol}` }
//   const update = {
//     open: stockList.open,
//     high: stockList.high,
//     low: stockList.low,
//     price: stockList.price,
//     volume: stockList.volume,
//     latestTrdDay: stockList.latestTrdDay,
//     previousClose: stockList.previousClose,
//     change: stockList.change,
//     changePercent: stockList.changePercent
//   }
//   // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
//   // upsert: bool - creates the object if it doesn't exist. defaults to false.
//   const options = { upsert: true, new: true }

//   const stockResult = List.findOneAndUpdate(query, update, options)
//   console.log('Saved the symbol web TO dbList', stockResult.symbol)
// }

const generateUrlArray = () => {
  const query = {}
  const projection = { _id: 0 }
  const dataFromDB = List.find(query, projection).select('symbol')
  linkArray = dataFromDB.map(item => {
    // return link = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${item.symbol}&apikey=6BUYSS9QR8Y9HH15`
    return item
  })
  console.log(linkArray)
  return linkArray
}

// generateUrlArray()

// const fetchDataFromDb = (query, projection) => {
//   // const query = {}
//   // const projection = { _id: 0 }
//   return dataFromDB = List.find(query, projection).then(item => {
//     return item.map(item => {
//       return {
//         symbol: item.symbol, //symbol
//         open: parseFloat(item.open), // open
//         high: parseFloat(item.high), // high
//         low: parseFloat(item.low), // low
//         price: parseFloat(item.price), // price
//         volume: parseFloat(item.volume), // volume
//         latestTrdDay: new Date(parseFloat(item.latestTrdDay)).toDateString(),//latestTrdDay
//         previousClose: parseFloat(item.previousClose),//previousClose
//         change: parseFloat(item.change),
//         changePercent: parseFloat(item.changePercent)//previousClose
//       }
//     })
//   })
// }

module.exports = {
  // saveToDb,
  // fetchDataFromDb,
  generateUrlArray
}
