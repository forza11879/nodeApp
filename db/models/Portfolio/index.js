const axios = require('axios')
const moment = require('moment')

const { Portfolio } = require('./Portfolio')

const fetchQtyPortfolio = async (arg) => {
  try {
    const orderType = arg.orderType
    let qty = parseInt(arg.qty)

    const query = { symbol: arg.symbol }//Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).
    const projection = { _id: 0 }//	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.

    // let oldQty = await Portfolio.find(query, projection).select("qtyPorfolio")//find returns the Object in the Array [{}]
    const oldQty = await Portfolio.findOne(query, projection).select("qtyPortfolio")//findOne returns teh Object{} without the Array
    console.log('old qty:' + typeof oldQty)
    console.log('old qty:' + JSON.stringify(oldQty))

    // if (isEmpty(oldQty)) return qty// Object is empty (Would return true in this example)
    if (oldQty === null) return qty// Object is empty (Would return true in this example)


    // Object is NOT empty
    if (orderType === 'Sell') qty = Math.abs(qty) * -1//converting positive Number to Negative Number in JavaScript
    const { qtyPortfolio } = oldQty
    console.log('old qty:' + JSON.stringify(qtyPortfolio))
    return newQty = qtyPortfolio + qty
  } catch (ex) {
    console.log(`fetchQtyPortfolio error: ${ex}`)
  }
}

const updateToPortfolio = async (arg, qtyPortfolio) => {
  try {
    const stockPortfolio = new Portfolio({
      symbol: arg.symbol,
      qtyPortfolio: qtyPortfolio
    })

    const query = { symbol: stockPortfolio.symbol }
    const update = {
      symbol: stockPortfolio.symbol,
      qtyPortfolio: stockPortfolio.qtyPortfolio,
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
  updateToPortfolio,
  fetchQtyPortfolio
}