const db = require('../db/indexStock')

exports.getChart = (req, res) => {
  let curValue = req.params.symbol
  res.render('chart', {
    curValue: curValue
  })
}

exports.getWebApi = async (req, res) => {
  try {
    let curValue = req.params.symbol
    console.log(`${curValue} - seacrhBox value`)
    console.log(typeof curValue)

    const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${curValue}&outputsize=compact&apikey=6BUYSS9QR8Y9HH15`

    const webApiData = await db.fetchWebApi(urlCompact)
    await db.creatStock(curValue, webApiData)

    res.send(webApiData)
  } catch (ex) {
    console.log(`getWebApi error: ${ex}`)
  }
}

exports.getDbFetch = async (req, res) => {
  try {
    let curValueDbFetch = req.params.symbol
    console.log(curValueDbFetch)

    const query = { symbol: `${curValueDbFetch}` }
    const projection = { _id: 0, data: 1 }

    const chartData = await db.fetchDb(query, projection)
    res.send(chartData)
  } catch (ex) {
    console.log(`getDbFetch error: ${ex}`)
  }
}

exports.getDbSearchApi = async (req, res) => {
  try {
    let curValueDbSearch = req.params.symbol
    const dbSearchApiData = await db.dbSearchApi(curValueDbSearch)
    res.send(dbSearchApiData)
  } catch (ex) {
    console.log(`getDbSearchApi error: ${ex}`)
  }
}


// Stock.find(
//   { $text: { $search: `"${curValueDbSearch}"` } },
//   { score: { $meta: 'textScore' } }
// )
//   .sort({
//     score: { $meta: 'textScore' }
//   })

exports.getSearchWebApi = async (req, res) => {
  try {
    let curValue = req.params.symbol
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${curValue}&apikey=TUVR`

    console.log(`reqBody:${req.body}`)
    console.log(`reqParamsSymbol:${req.params.symbol}`)

    const webApiData = await db.searchWebApi(url)

    return res.send(webApiData)
  } catch (ex) {
    console.log(`getSearchWebApi error: ${ex}`)
  }
}

//     // console.log(chartData)
//     // res.send(chartData)
//     // res.render('home', {
//     //   nameUpperCase: curValue,
//     //   chartValue: chartData
//     // })
//   })
// 

//       // res.render('home', {
//       //   nameUpperCase: curValue,
//       //   chartData: chartData
//       // })
//       // res.render({
//       //   symbol: chartData
//       // })
//       return res.send(chartData)



