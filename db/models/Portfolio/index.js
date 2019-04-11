const axios = require('axios')
const moment = require('moment')

const { Portfolio } = require('./Portfolio')

const addToPortfolio = async (arg, avgPrice, qty) => {
  try {
    const stockTransaction = new Portfolio({
      symbol: arg.symbol,
      price: arg.price,
      qty: arg.qty,
      orderType: arg.orderType
    })

    const query = { symbol: stockTransaction.symbol }
    const update = {
      symbol: stockTransaction.symbol,
      price: stockTransaction.price,
      qty: stockTransaction.qty,
      orderType: stockTransaction.orderType
    }
    // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    // upsert: bool - creates the object if it doesn't exist. defaults to false.
    const options = { upsert: true, new: true }

    const stockPortfolioResult = await Portfolio.findOneAndUpdate(query, update, options)
    console.log("Saved portfolio to db Portfolio", stockPortfolioResult.symbol)
  } catch (ex) {
    console.log(`addToPortfolio error: ${ex}`)
  }
}

const fetchWebApiQuote = async url => {
  try {
    const myJson = await axios.get(url)
    const myJsonData = myJson.data
    return {
      symbol: myJsonData['symbol'],
      companyName: myJsonData['companyName'],
      latestPrice: myJsonData['latestPrice'],
      change: myJsonData['change'],
      latestUpdate: moment(myJsonData['latestUpdate']).utcOffset(-240).format('LLLL'),
      high: myJsonData['high'],
      low: myJsonData['low'],
      week52High: myJsonData['week52High'],
      week52Low: myJsonData['week52Low'],
      open: myJsonData['open'],
      previousClose: myJsonData['previousClose']
    }
  } catch (ex) {
    console.log(`fetchWebApiQuote error: ${ex}`)
  }
}

module.exports = {
  fetchWebApiQuote,
  addToPortfolio
}