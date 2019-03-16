const db = require('../db/indexStock')

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
