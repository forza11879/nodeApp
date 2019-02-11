const axios = require('axios')

exports.formApi = (req, res) => {
  let curValue = req.query.symbol
  // console.log(curValue)

  const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${curValue}&outputsize=compact&apikey=TUVR`

  const urlFull = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${curValue}&outputsize=full&apikey=TUVR`

  axios.get(urlCompact)
    .then(response => {
      let highLow = Object.keys(response.data['Time Series (Daily)']).map(date => {
        return {
          date: Date.parse(date),
          open: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['1. open']) * 100) / 100,
          high: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['2. high']) * 100) / 100,
          low: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['3. low']) * 100) / 100,
          close: Math.round(parseFloat(response.data['Time Series (Daily)'][date]['4. close']) * 100) / 100,
          volume: parseInt(response.data['Time Series (Daily)'][date]['5. volume'])
        }
      })

      console.log(highLow)
      // res.send(highLow)
       res.render('home', {
        // nameUpperCase: curValue,
        chartValue: highLow
      })
    })
}