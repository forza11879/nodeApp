const axios = require('axios')

exports.getWebApiList = (req, res) => {

  let curValue = req.params.symbol
  console.log(`${curValue} - seacrhBox value`)
  console.log(typeof curValue)

  const urlCompact = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${curValue}&apikey=6BUYSS9QR8Y9HH15`

  // const urlCompact = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=6BUYSS9QR8Y9HH15`

  async function fetchWebApiList(url) {
    try {
      const myJson = await axios.get(url)
      // console.log(myJson)
      return {
        symbol: myJson.data['Global Quote']['01. symbol'],
        open: myJson.data['Global Quote']['02. open'],
        high: myJson.data['Global Quote']['03. high'],
        low: myJson.data['Global Quote']['04. low'],
        price: myJson.data['Global Quote']['05. price'],
        volume: myJson.data['Global Quote']['06. volume'],
        latestTrdDay: myJson.data['Global Quote']['07. latest trading day'],
        previousClose: myJson.data['Global Quote']['08. previous close'],
        change: myJson.data['Global Quote']['09. change'],
        changePercent: myJson.data['Global Quote']['10. change percent']
      }
    } catch (ex) {
      console.log(`creatStock error: ${ex}`)
    }
  }

  (async function fetchDataList() {
    try {
      const webApiDataList = await fetchWebApiList(urlCompact)
      console.log(webApiDataList)
      return res.send(webApiDataList)
    } catch (ex) {
      console.log(`creatStock error: ${ex}`)
    }
  })()
}



