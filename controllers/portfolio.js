const db = require('../db/models/Portfolio')

exports.getBuySellTicket = async (req, res) => {
  const curValue = req.params.symbol
  const apiTokenQuote = process.env.API_TOKEN_QUOTE
  const url = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiTokenQuote}`
  // const url = `https://cloud.iexapis.com/beta/stock/aapl/quote?token=pk_0f5e9e6bca7548918adc6512bcb57ff4`
  const data = await db.fetchWebApiQuote(url)
  console.log(data)
  res.render('buysell', {
    curValue: curValue,
    data: data
  })
}

