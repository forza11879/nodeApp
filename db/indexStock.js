const axios = require('axios')
const { Stock } = require('./models/Stock')


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


module.exports = {
  fetchWebApi,
  creatStock
}