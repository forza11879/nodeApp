const db = require('../db/models/List')

exports.getWebApiList = async (req, res) => {
  try {
    const curValue = req.params.symbol
    const apiKey = process.env.API_KEY
    const urlCompact = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${curValue}&apikey=${apiKey}`

    let urlArray = await db.generateUrlArrayList({}, { _id: 0 })

    if (!urlArray.includes(urlCompact)) urlArray.push(urlCompact)

    await Promise.all(
      urlArray.map(async url => {
        const data = await db.fetchWebApiList(url)
        await db.saveToDbList(data)
      })
    )

    const dataFromDB = await db.fetchDataFromDbList({}, { _id: 0 })

    res.send(dataFromDB)
  } catch (ex) {
    // example of nice error handling - 500 Internal Server Error
    res.status(500).send(`getWebApiList: ${ex}`)
  }
}
