const axios = require('axios')
const moment = require('moment')

const portfolio = require('../Portfolio')
const user = require('../User')

const { Transaction } = require('./Transaction')

const createTransaction = async arg => {
  try {
    const stockTransaction = new Transaction({
      symbol: arg.symbol,
      price: arg.price,
      qty: arg.qty,
      orderType: arg.orderType
    })
    const stockTransactionResult = await stockTransaction.save()

    // console.log('createTransaction cash:' + typeof cash)
    // console.log('createTransaction cash:' + JSON.stringify(cash))
    // console.log('createTransaction cash:' + cash.toString())

    const cash = await user.fetchCash(arg)
    await user.updateToUser(arg, cash)
    

    const qtyPortfolio = await portfolio.fetchQtyPortfolio(arg)
    //verify if you need await 
    await portfolio.updateToPortfolio(arg, qtyPortfolio)

    console.log("Saved transaction to db Transaction", stockTransactionResult.symbol)
  } catch (ex) {
    console.log(`createTransaction error: ${ex}`)
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
  createTransaction,
  fetchWebApiQuote
}