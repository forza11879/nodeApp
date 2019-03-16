const axios = require('axios')
const { Stock } = require('./models/Stock')

const searchWebApi = async url => {
  try {
    const response = await axios.get(url)
    const highLow = await response.data.bestMatches.map(item => {
      // let resultSymbol = item['1. symbol']+ ' - ' + item['2. name']
      // return resultSymbol
      return {
        symbol: item['1. symbol']
      }
    })
    console.log(highLow)
    return highLow
  } catch (ex) {
    console.log(`searchWebApi error: ${ex}`)
  }
}

const fetchWebApi = async url => {
  try {
    const response = await axios.get(url)
    return parsedData = await Object.keys(response.data['Time Series (Daily)']).map(date => {
      return {
        date: Date.parse(date),
        open: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['1. open']) * 100) / 100,
        high: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['2. high']) * 100) / 100,
        low: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['3. low']) * 100) / 100,
        close: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['4. close']) * 100) / 100,
        volume: parseInt(response.data['Time Series (Daily)'][date]['5. volume'])
      }
    })
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
    const query = { symbol: `${curValue}` }
    const update = { $addToSet: { data: stock.data } }
    const options = { upsert: true, new: true }

    const stockResult = await Stock.findOneAndUpdate(query, update, options)
    console.log('Saved the symbol web TO db', stockResult.symbol)
  } catch (ex) {
    console.log(`creatStock error: ${ex}`)
  }
}

const fetchDb = async (query, projection) => {
  try {
    const chartData = await Stock.findOne(query, projection).sort({ date: -1 })
    return await chartData.data.map(item => {
      return {
        date: parseFloat(item.date), // the date
        open: parseFloat(item.open), // open
        high: parseFloat(item.high), // high
        low: parseFloat(item.low), // low
        close: parseFloat(item.close), // close
        volume: parseFloat(item.volume)//volume
      }
    })
  } catch (ex) {
    console.log(`fetchDb error: ${ex}`)
  }
}

const dbSearchApi = async (curValueDbSearch) => {
  try {
    let queryRegex = `^${curValueDbSearch}`
    const searchBoxData = await Stock.find({ symbol: { '$regex': queryRegex, '$options': 'i' } })
      .limit(10)
    return await searchBoxData.map(item => {
      return {
        symbol: item.symbol//symbol
      }
    })
  } catch (ex) {
    console.log(`dbSearchApi error: ${ex}`)
  }
}

module.exports = {
  fetchWebApi,
  creatStock,
  fetchDb,
  dbSearchApi,
  searchWebApi
}