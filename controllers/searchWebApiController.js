const axios = require('axios')
// const { validateJoi } = require('../models/Stock')

exports.searchWebApi = (req, res) => {
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



