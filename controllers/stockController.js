const axios = require('axios')
const db = require('../db/indexStock')


exports.getWebApi = async (req, res) => {
  let curValue = req.params.symbol
  console.log(`${curValue} - seacrhBox value`)
  console.log(typeof curValue)

  const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${curValue}&outputsize=compact&apikey=6BUYSS9QR8Y9HH15`
  
  try {
    const webApiData = await db.fetchWebApi(urlCompact)
    await db.creatStock(curValue, webApiData)
    return res.send(webApiData)
  } catch (ex) {
    console.log(`creatStock error: ${ex}`)
  }
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

exports.getSearchWebApi = (req, res) => {
  let curValue = req.params.symbol
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${curValue}&apikey=TUVR`

  console.log(`reqBody:${req.body}`)
  console.log(`reqParamsSymbol:${req.params.symbol}`)

  async function fetchWebApiSearch(url) {
    try {
      // const { error } = validateJoi(req.body)
      // // if (error) return res.status(400).send(error.details[0].message)
      // if (error) return res.status(400).send(error)

      const response = await axios.get(url)
      const highLow = await response.data.bestMatches.map(item => {
        // let resultSymbol = item['1. symbol']+ ' - ' + item['2. name']
        // return resultSymbol
        return {
          symbol: item['1. symbol']
        }
      })
      console.log(highLow)
      return highLow
    } catch (ex) {
      // for(field in errors)
      // console.log(`fetchWebApi error: ${ex.errors[field].message}`)
      console.log(`fetchWebApi error: ${ex}`)
      // console.log(`fetchWebApi error: ${ex.errors}`)
      // console.log(`fetchWebApi error: ${ex.message}`)
      // console.log(`fetchWebApi error: ${ex.errors.message}`)
    }
  }

  (async function renderData() {
    try {
      const webApiData = await fetchWebApiSearch(url)
      return res.send(webApiData)
    } catch (ex) {
      // for(field in errors)
      // console.log(`fetchWebApi error: ${ex.errors[field].message}`)
      console.log(`fetchWebApi error: ${ex}`)
      // console.log(`fetchWebApi error: ${ex.errors}`)
      // console.log(`fetchWebApi error: ${ex.message}`)
      // console.log(`fetchWebApi error: ${ex.errors.message}`)
    }
  })()
}

  // axios.get(url)
  //   .then(response => {
  //     let highLow = response.data.bestMatches.map(item => {
  //       // let resultSymbol = item['1. symbol']+ ' - ' + item['2. name']
  //       // return resultSymbol
  //       return {
  //         symbol: item['1. symbol']
  //       }
  //     })
  //     console.log(highLow)
  //     res.send(highLow)
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //   })


