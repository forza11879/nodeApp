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
      console.log(`fetchWebApiList error: ${ex}`)
    }
  }

  async function saveToDb(arg) {
    try {
      const stockList = new StockList({
        // symbol: arg.symbol,
        // data: arg
        symbol: arg.symbol,
        open: arg.open,
        high: arg.high,
        low: arg.low,
        price: arg.price,
        volume: arg.volume,
        latestTrdDay: arg.latestTrdDay,
        previousClose: arg.previousClose,
        change: arg.change,
        changePercent: arg.changePercent
      })
      console.log(stockList)
      const query = { symbol: `${stockList.symbol}` }
      // const update = { $addToSet: { data: stockList.data } }
      const update = {
        $addToSet: {
          open: stockList.open,
          high: stockList.high,
          low: stockList.low,
          price: stockList.price,
          volume: stockList.volume,
          latestTrdDay: stockList.latestTrdDay,
          previousClose: stockList.previousClose,
          change: stockList.change,
          changePercent: stockList.changePercent
        }
      }
      const options = { upsert: true, new: true }

      const stockResult = await StockList.findOneAndUpdate(query, update, options)
      console.log('Saved the symbol web TO dbList', stockResult.symbol)
    } catch (ex) {
      console.log(`saveToDbWebApiList error: ${ex}`)
    }
  }

  async function fetchDataFromDb() {
    try {
      // const query = { symbol: `${curValueDbFetch}` }
      const query = null
      const projection = { 
        _id: 0,
        symbol: 1,
        open: 1,
        low: 1,
        price: 1,
        volume: 1,
        latestTrdDay: 1,
        previousClose: 1,
        change: 1,
        changePercent: 1
      }

      const datafromDB = await StockList.find(query, projection)
      // .sort({ date: -1 })
      console.log(datafromDB)

      return datafromDB.map(item => {
        return {
          
          symbol: item.symbol, //symbol
          open: parseFloat(item.open), // the open
          high: parseFloat(item.high), // high
          low: parseFloat(item.low), // low
          price: parseFloat(item.price), // price
          volume: parseFloat(item.volume), // volume
          latestTrdDay: parseFloat(item.latestTrdDay),//latestTrdDay
          previousClose: parseFloat(item.previousClose),//previousClose
          change: parseFloat(item.change),
          changePercent: parseFloat(item.changePercent)//previousClose


          // symbol: item.symbol, //symbol
          // open: item.open[0], // the open
          // high: item.high[0], // high
          // low: item.low[0], // low
          // price: item.price[0], // price
          // volume: item.volume[0], // volume
          // latestTrdDay: item.latestTrdDay[0],//latestTrdDay
          // previousClose: item.previousClose[0],//previousClose
          // change: item.change[0],
          // changePercent: item.changePercent[0]//previousClose

          // symbol: item.symbol, //symbol
          // open: parseFloat(item[0].open), // the open
          // high: parseFloat(item[0].high), // high
          // low: parseFloat(item[0].low), // low
          // price: parseFloat(item[0].price), // price
          // volume: parseFloat(item[0].volume), // volume
          // latestTrdDay: parseFloat(item[0].latestTrdDay),//latestTrdDay
          // previousClose: parseFloat(item[0].previousClose),//previousClose
          // change: parseFloat(item[0].change),
          // changePercent: parseFloat(item[0].changePercent)//previousClose

          // symbol: item.symbol, //symbol
          // open: parseFloat(item.open[0]), // the open
          // high: parseFloat(item.high[0]), // high
          // low: parseFloat(item.low[0]), // low
          // price: parseFloat(item.price[0]), // price
          // volume: parseFloat(item.volume[0]), // volume
          // latestTrdDay: parseFloat(item.latestTrdDay[0]),//latestTrdDay
          // previousClose: parseFloat(item.previousClose[0]),//previousClose
          // change: parseFloat(item.change[0]),
          // changePercent: parseFloat(item.changePercent[0])//previousClose

        }
      })

    } catch (error) {
      console.log(`fetchDataFromDb error: ${ex}`)
    }
  }

  (async function fetchDataList() {
    try {
      const webApiDataList = await fetchWebApiList(urlCompact)
      console.log(webApiDataList)
      await saveToDb(webApiDataList)
      const dataFromDB = await fetchDataFromDb()
      return res.send(dataFromDB)
    } catch (ex) {
      console.log(`creatStockList error: ${ex}`)
    }
  })()
}




