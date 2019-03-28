const db = require('../db/models/List')

exports.getWebApiList = (req, res) => {

  async function webApiSaveToDbList(url) {
    try {
      const data = await db.fetchWebApiList(url)
      await db.saveToDbList(data)
    } catch (ex) {
      console.log(`webApiSaveToDb error: ${ex}`)
    }
  }

  (async function fetchDataList() {
    try {
      let curValue = req.params.symbol
      const urlCompact = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${curValue}&apikey=6BUYSS9QR8Y9HH15`

      const urlArray = await db.generateUrlArrayList({}, { _id: 0 })
      const promises = []

      if (urlArray.includes(urlCompact)) {
        for (i = 0; i < urlArray.length; ++i) {
          await promises.push(webApiSaveToDbList(urlArray[i]))
        }
        await Promise.all(promises)
      } else {
        const newArray = await urlArray.concat(urlCompact)
        for (i = 0; i < newArray.length; ++i) {
          await promises.push(webApiSaveToDbList(newArray[i]))
        }
        await Promise.all(promises)
      }

      const dataFromDB = await db.fetchDataFromDbList({}, { _id: 0 })
      return res.send(dataFromDB)

    } catch (ex) {
      console.log(`fetchDataList error: ${ex}`)
    }
  })()
}







