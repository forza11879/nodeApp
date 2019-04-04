const axios = require('axios')
const { Stock } = require('./Stock')

const searchWebApi = async url => {
  try {
    const response = await axios.get(url)

    const highLow = response.data.bestMatches.map(item => ({
      symbol: item["1. symbol"]
    }))
    console.log(highLow)
    return highLow
  } catch (ex) {
    console.log(`searchWebApi error: ${ex}`)
  }
}

const fetchWebApi = async url => {
  try {
    const response = await axios.get(url)
    return Object.entries(response.data["Time Series (Daily)"]).map(
      ([date, dateObj]) => ({
        date: Date.parse(date),
        open: Math.round(parseFloat(dateObj["1. open"]) * 100) / 100,
        high: Math.round(parseFloat(dateObj["2. high"]) * 100) / 100,
        low: Math.round(parseFloat(dateObj["3. low"]) * 100) / 100,
        close: Math.round(parseFloat(dateObj["4. close"]) * 100) / 100,
        volume: parseInt(dateObj["5. volume"])
        //parseInt vs unary plus  +dateObj["5. volume"]
      })
    )
  } catch (ex) {
    console.log(`fetchWebApi error: ${ex}`)
  }
}

const creatStock = async (curValue, webApiData) => {
  try {
    const stock = new Stock({
      symbol: curValue,
      data: webApiData
    })

    const query = { symbol: curValue }
    const update = { $addToSet: { data: stock.data } }
    const options = { upsert: true, new: true }

    const stockResult = await Stock.findOneAndUpdate(query, update, options)
    console.log("Saved the symbol web TO db", stockResult.symbol)
  } catch (ex) {
    console.log(`creatStock error: ${ex}`)
  }
}

const fetchDb = async (query, projection) => {
  try {
    const chartData = await Stock.findOne(query, projection).sort({ date: -1 })
    return chartData.data.map(item => ({
      date: parseFloat(item.date),
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseFloat(item.volume)
    }))
  } catch (ex) {
    console.log(`fetchDb error: ${ex}`)
  }
}

const dbSearchApi = async curValueDbSearch => {
  try {
    let queryRegex = `^${curValueDbSearch}`
    const searchBoxData = await Stock.find({
      symbol: { $regex: queryRegex, $options: "i" }
    }).limit(10)
    return searchBoxData.map(item => ({
      symbol: item.symbol
    }))
  } catch (ex) {
    console.log(`dbSearchApi error: ${ex}`)
  }
}

// Stock.find(
//   { $text: { $search: `"${curValueDbSearch}"` } },
//   { score: { $meta: 'textScore' } }
// )
//   .sort({
//     score: { $meta: 'textScore' }
//   })

module.exports = {
  fetchWebApi,
  creatStock,
  fetchDb,
  dbSearchApi,
  searchWebApi
}
