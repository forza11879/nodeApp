exports.getWebApiList = (req, res) => {

  let curValue = req.params.symbol
  console.log(`${curValue} - seacrhBox value`)
  console.log(typeof curValue)

  const urlCompact = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${curValue}&apikey=6BUYSS9QR8Y9HH15`

  async function fetchWebApiList(url) {
    try {
      const response = await axios.get(url)
      return parsedData = await Object.keys(response.data['Global Quote']).map(item => {
        return {
          symbol: response.data['Global Quote'][item]['01. symbol'],
          open: response.data['Global Quote'][item]['02. open'],
          high: response.data['Global Quote'][item]['03. high'],
          low: response.data['Global Quote'][item]['04. low'],
          price: response.data['Global Quote'][item]['05. price'],
          volume: response.data['Global Quote'][item]['06. volume'],
          latestTrdDay: response.data['Global Quote'][item]['07. latest trading day'],
          previousClose: response.data['Global Quote'][item]['08. previous close'],
          change: response.data['Global Quote'][item]['09. change'],
          changePercent: response.data['Global Quote'][item]['10. change percent']
        }
      })
    } catch (ex) {
      console.log(`fetchWebApiList error: ${ex}`)
    }
  }

  (async function fetchDataList() {
    try {
      const webApiDataList = await fetchWebApiList(urlCompact)
      return res.send(webApiDataList)
    } catch (ex) {
      console.log(`creatStock error: ${ex}`)
    }
  })()
}

