const axios = require('axios')
async function fetchWebApi(url) {
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

module.exports.fetchWebApi = fetchWebApi

