const axios = require('axios')
const { Portfolio } = require('./Portfolio')

const fetchWebApiQuote = async url => {
  try {
    const myJson = await axios.get(url)
    const myJsonData = myJson.data
    return {
      symbol:myJsonData['symbol'],
      latestPrice:myJsonData['latestPrice'],
      high:myJsonData['high'],
      low:myJsonData['low'],
      week52High:myJsonData['week52High'],
      week52Low:myJsonData['week52Low'],
      open:myJsonData['open'],
      previousClose:myJsonData['previousClose']
      
    }
  } catch (ex) {
    console.log(`fetchWebApiQuote error: ${ex}`)
  }
}

module.exports = {
  fetchWebApiQuote
}