const axios = require('axios')
//NEED Stock model 
const { StockList } = require('../models/List')

exports.getWebApiList = (req, res) => {

  let curValue = req.params.symbol
  console.log(`${curValue} - seacrhBox value`)
  console.log(typeof curValue)

  const urlCompact = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${curValue}&apikey=6BUYSS9QR8Y9HH15`

  async function fetchWebApiList(url) {
    try {
      const myJson = await axios.get(url)
      // console.log(myJson)
      return {
        symbol: myJson.data['Global Quote']['01. symbol'],
        open: Math.round(parseFloat(myJson.data['Global Quote']['02. open']) * 100) / 100,
        high: Math.round(parseFloat(myJson.data['Global Quote']['03. high']) * 100) / 100,
        low: Math.round(parseFloat(myJson.data['Global Quote']['04. low']) * 100) / 100,
        price: Math.round(parseFloat(myJson.data['Global Quote']['05. price']) * 100) / 100,
        volume: parseInt(myJson.data['Global Quote']['06. volume']),
        latestTrdDay: Date.parse(myJson.data['Global Quote']['07. latest trading day']),
        previousClose: Math.round(parseFloat(myJson.data['Global Quote']['08. previous close']) * 100) / 100,
        change: Math.round(parseFloat(myJson.data['Global Quote']['09. change']) * 100) / 100,
        changePercent: Math.round(parseFloat((myJson.data['Global Quote']['10. change percent']).substring(0, myJson.data['Global Quote']['10. change percent'].length - 1)) * 100) / 100
      }
    } catch (ex) {
      console.log(`creatStock error: ${ex}`)
    }
  }

  (async function fetchDataList() {
    try {
      const webApiDataList = await fetchWebApiList(urlCompact)
      console.log(webApiDataList)
      const stockList = new StockList({
        symbol: webApiDataList.symbol,
        data: webApiDataList
        // open: webApiDataList.open,
        // high: webApiDataList.high,
        // low: webApiDataList.low,
        // price: webApiDataList.price,
        // volume: webApiDataList.volume,
        // latestTrdDay: webApiDataList.latestTrdDay,
        // previousClose: webApiDataList.previousClose,
        // change: webApiDataList.change,
        // changePercent: webApiDataList.changePercent
      })
      console.log(stockList)
      const query = { symbol: `${webApiDataList.symbol}` }
      const update = {$addToSet: { data: stockList.data }}
      // const update = {
      //   $addToSet: { 
      //     symbol: stockList.symbol,
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
      // }
      const options = { upsert: true, new: true }

      const stockResult = await StockList.findOneAndUpdate(query, update, options)
      console.log('Saved the symbol web TO dbList', stockResult.symbol)
      return res.send(webApiDataList)
    } catch (ex) {
      console.log(`creatStockList error: ${ex}`)
    }
  })()
}




