const db = require('../db/models/Portfolio')

exports.getBuySellTicket = async (req, res) => {
  const curValue = req.params.symbol
  const apiTokenQuote = process.env.API_TOKEN_QUOTE
  const url = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiTokenQuote}`
  const data = await db.fetchWebApiQuote(url)
  res.render('buysell', {
    data: data
  })
}

