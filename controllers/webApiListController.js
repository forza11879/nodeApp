const axios = require('axios')
const db = require('../db')

exports.getWebApiList = (req, res) => {

  let curValue = req.params.symbol
  // console.log(`${curValue} - seacrhBox value`)
  // console.log(typeof curValue)

  const urlCompact = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${curValue}&apikey=6BUYSS9QR8Y9HH15`

  async function webApiSaveToDb(url) {
    try {
      const data = await db.fetchWebApiList(url)
      await db.saveToDb(data)
    } catch (ex) {
      console.log(`webApiSaveToDb error: ${ex}`)
    }
  }

  (async function fetchDataList() {
    try {
      const urlArray = await db.generateUrlArray({}, { _id: 0 })
      const promises = []

      if (urlArray.includes(urlCompact)) {
        for (i = 0; i < urlArray.length; ++i) {
          await promises.push(webApiSaveToDb(urlArray[i]))
        }
        await Promise.all(promises)
      } else {
        const newArray = await urlArray.concat(urlCompact)
        for (i = 0; i < newArray.length; ++i) {
          await promises.push(webApiSaveToDb(newArray[i]))
        }
        await Promise.all(promises)
      }

      const dataFromDB = await db.fetchDataFromDb({}, { _id: 0 })
      return res.send(dataFromDB)

    } catch (ex) {
      console.log(`fetchDataList error: ${ex}`)
    }
  })()
}







