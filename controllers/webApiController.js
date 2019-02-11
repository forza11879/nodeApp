const mongoose = require('mongoose')
const axios = require('axios')

//NEED Stock model
const { Stock, validateJoi } = require('../models/Stock')

exports.webApi = (req, res) => {
  let curValue = req.params.symbol
  // console.log(req.body)
  // console.log(req.params.symbol)
  
  // let curValue = req.query.symbol
  console.log(`${curValue} - seacrhBox value`)
  console.log(typeof curValue)

  const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${curValue}&outputsize=compact&apikey=6BUYSS9QR8Y9HH15`

  const urlFull = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${curValue}&outputsize=full&apikey=6BUYSS9QR8Y9HH15`

  async function fetchWebApi(url) {
    try {
      // const { error } = validateJoi(req.params.symbol)
      // const { error } = validateJoi(req.body)
      // if (error) return res.status(400).send(error.details[0].message)
      
      const response = await axios.get(url)
      const parsedData = await Object.keys(response.data['Time Series (Daily)']).map(date => {
        return {
          date: Date.parse(date),
          open: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['1. open']) * 100) / 100,
          high: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['2. high']) * 100) / 100,
          low: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['3. low']) * 100) / 100,
          close: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['4. close']) * 100) / 100,
          volume: parseInt(response.data['Time Series (Daily)'][date]['5. volume'])
        }
      })
      return parsedData
    } catch (ex) {
      // for(field in errors)
      // console.log(`fetchWebApi error: ${ex.errors[field].message}`)
      console.log(`fetchWebApi error: ${ex}`)
      // console.log(`fetchWebApi error: ${ex.errors}`)
      // console.log(`fetchWebApi error: ${ex.message}`)
      // console.log(`fetchWebApi error: ${ex.errors.message}`)
    }
  }

  (async function creatStock() {
    try {
      // const { error } = validateJoi(req.body)
      // // if (error) return res.status(400).send(error.details[0].message)
      // if (error) return res.status(400).send(error)

      const webApiData = await fetchWebApi(urlCompact)
      const stock = new Stock({
        symbol: curValue,
        data: webApiData
      })

      const query = { symbol: `${curValue}` }
      const update = { $addToSet: { data: stock.data } }
      const options = { upsert: true, new: true }

      const stockResult = await Stock.findOneAndUpdate(query, update, options)
      console.log('Saved the symbol web TO db', stockResult.symbol)
      return res.send(webApiData)

    } catch (ex) {
      // for(field in errors)
      // console.log(`creatStock error: ${ex.errors[field].message}`)
      console.log(`creatStock error: ${ex}`)
      // console.log(`creatStock error: ${ex.errors}`)
      // console.log(`creatStock error: ${ex.message}`)
      // console.log(`creatStock error: ${ex.error.message}`)
    }
  })()
}



// axios.get(urlCompact)
  //   .then(response => {
  //     return chartData = Object.keys(response.data['Time Series (Daily)']
  //       // let chartData = Object.keys(response.data
  //     ).map(date => {
  //       return {
  //         date: Date.parse(date),
  //         open: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['1. open']) * 100) / 100,
  //         high: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['2. high']) * 100) / 100,
  //         low: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['3. low']) * 100) / 100,
  //         close: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['4. close']) * 100) / 100,
  //         volume: parseInt(response.data['Time Series (Daily)'][date]['5. volume'])
  //       }
  //     })

  //     // console.log(chartData)
  //     // res.send(chartData)
  //     // res.render('home', {
  //     //   nameUpperCase: curValue,
  //     //   chartValue: chartData
  //     // })
  //   })
  //   .then(_ => {
  //     // console.log(chartData)
  //     const curValueSchema = new ParentSchemaSymbol()
  //     curValueSchema.symbol = curValue
  //     chartData.map(item => {
  //       curValueSchema.data.push(item)
  //     })
  //     const query = { symbol: `${curValue}` }
  //     const update = { $addToSet: { data: curValueSchema.data } }
  //     const options = { upsert: true, new: true }

  //     ParentSchemaSymbol.findOneAndUpdate(query, update, options).then(doc => {
  //       console.log('Saved the symbol web TO db', doc.symbol)
  //       // console.log('Saved the symbol', doc)

  //       // res.render('home', {
  //       //   nameUpperCase: curValue,
  //       //   chartData: chartData
  //       // })
  //       // res.render({
  //       //   symbol: chartData
  //       // })
  //       return res.send(chartData)
  //     }).catch(e => {
  //       console.log(e)
  //     })
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })


