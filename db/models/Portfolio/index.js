const axios = require('axios')
const moment = require('moment')

const { Portfolio } = require('./Portfolio')

const fetchQtyPortfolio = async (arg) => {
  const query = { symbol: arg.symbol }//Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).
  const projection = { _id: 0 }//	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.
  const orderType = arg.orderType
  console.log('order type:' + orderType)
  const qty = arg.qty
  console.log('new qty:' + qty)
  
  const oldQty = await Portfolio.find(query, projection).select("qtyPorfolio")
  console.log('old qty:' + oldQty)
  if (!oldQty) oldQty = 0
  if(orderType == 'Sell') qty = -1 * qty
  console.log('new qty after minus:' + qty)
  return newQty = oldQty + qty
}

const addToPortfolio = async (arg, qtyPorfolio) => {
  try {
    const stockPortfolio = new Portfolio({
      symbol: arg.symbol,
      qtyPorfolio: qtyPorfolio
    })

    const query = { symbol: stockPortfolio.symbol }
    const update = {
      symbol: stockPortfolio.symbol,
      qtyPorfolio: stockPortfolio.qtyPorfolio,
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
  addToPortfolio,
  fetchQtyPortfolio
}