const db = require('../db/models/Transaction')
const portfolio = require('../db/models/Portfolio')

exports.postAddTransaction = async (req, res) => {
  const curValue = req.body.symbol
  const arg = req.body
  const apiTokenQuote = process.env.API_TOKEN_QUOTE

  const url = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiTokenQuote}`

  const qtyPorfolio = await portfolio.fetchQtyPortfolio(arg)
  console.log('quantity portfolio' + qtyPorfolio)
 
  await db.createTransaction(arg, qtyPorfolio)
  const data = await db.fetchWebApiQuote(url)

  res.render('buysell', {
    data: data
  })
}



