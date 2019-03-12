const axios = require('axios')
//NEED Stock model 
const { List } = require('../models/List')

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
        open: myJson.data['Global Quote']['02. open'],
        open: myJson.data['Global Quote']['02. open'],
        high: myJson.data['Global Quote']['03. high'],
        low: myJson.data['Global Quote']['04. low'],
        price: myJson.data['Global Quote']['05. price'],
        volume: myJson.data['Global Quote']['06. volume'],
        latestTrdDay: Date.parse(myJson.data['Global Quote']['07. latest trading day']),
        previousClose: myJson.data['Global Quote']['08. previous close'],
        change: myJson.data['Global Quote']['09. change'],
        changePercent: (myJson.data['Global Quote']['10. change percent']).substring(0, myJson.data['Global Quote']['10. change percent'].length - 1)
      }
    } catch (ex) {
      console.log(`fetchWebApiList error: ${ex}`)
    }
  }

  async function saveToDb(arg) {
    try {
      const stockList = new List({
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

      const query = { symbol: `${stockList.symbol}` }
      const update = {
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
      // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
      // upsert: bool - creates the object if it doesn't exist. defaults to false.
      const options = { upsert: true, new: true }

      const stockResult = await List.findOneAndUpdate(query, update, options)
      console.log('Saved the symbol web TO dbList', stockResult.symbol)
    } catch (ex) {
      console.log(`saveToDb error: ${ex}`)
    }
  }

  async function fetchDataFromDb() {
    try {
      const query = {}
      const projection = { _id: 0 }
      return dataFromDB = await List.find(query, projection).then(item => {
        return item.map(item => {
          return {
            symbol: item.symbol, //symbol
            open: parseFloat(item.open), // the open
            high: parseFloat(item.high), // high
            low: parseFloat(item.low), // low
            price: parseFloat(item.price), // price
            volume: parseFloat(item.volume), // volume
            latestTrdDay: new Date(parseFloat(item.latestTrdDay)).toDateString(),//latestTrdDay
            previousClose: parseFloat(item.previousClose),//previousClose
            change: parseFloat(item.change),
            changePercent: parseFloat(item.changePercent)//previousClose
          }
        })
      })

      // .select('symbol open high low price volume latestTrdDay previousClose change changePercent')
      // .populate('open high low price volume latestTrdDay previousClose change changePercent')
    } catch (ex) {
      console.log(`fetchDataFromDb error: ${ex}`)
    }
  }
  async function generateUrlArray() {
    try {
      const query = {}
      const projection = { _id: 0 }
      const dataFromDB = await List.find(query, projection).select('symbol')
      return linkArray = dataFromDB.map(item => {
        // return link = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${item.symbol}&apikey=demo`
        return link = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${item.symbol}&apikey=6BUYSS9QR8Y9HH15`
      })
    } catch (ex) {
      console.log(`generateUrlArray error: ${ex}`)
    }
  }

  // async function loopSaveToDb(newArray) {
  //   for (const url of newArray) {
  //     const data = await fetchWebApiList(url)
  //     await saveToDb(data)
  //   }
  // }

  async function loopSaveToDb(url) {
    try {
      const data = await fetchWebApiList(url)
    await saveToDb(data)
    } catch (ex) {
      console.log(`loopSaveToDb error: ${ex}`)
    }
    
  }

  (async function fetchDataList() {
    try {
      const urlArray = await generateUrlArray()
      const promises = []

      if (urlArray.includes(urlCompact)) {
        for (i = 0; i < urlArray.length; ++i) {
          await promises.push(loopSaveToDb(urlArray[i]))
        }
        await Promise.all(promises)
      } else {
        const newArray = await urlArray.concat(urlCompact)
        for (i = 0; i < newArray.length; ++i) {
          await promises.push(loopSaveToDb(newArray[i]))
        }
        await Promise.all(promises)
      }

      const dataFromDB = await fetchDataFromDb()
      return res.send(dataFromDB)
    } catch (ex) {
      console.log(`fetchDataList error: ${ex}`)
    }
  })()
}





