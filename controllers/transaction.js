const db = require('../db/models/Transaction')

exports.postAddTransaction = async (req, res) => {
  const curValue = req.body.symbol
  const arg = req.body
  const apiTokenQuote = process.env.API_TOKEN_QUOTE

  const url = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiTokenQuote}`

  console.log('postAddTRansaction userId ' + arg.userId)
  await db.createTransaction(arg)
  const data = await db.fetchWebApiQuote(url)

  res.render('buysell', {
    data: data
  })
}



