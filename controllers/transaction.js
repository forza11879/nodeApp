const db = require('../db/models/Transaction')
const user = require('../db/models/User')

exports.postAddTransaction = async (req, res) => {
  const curValue = req.body.symbol
  const arg = req.body
  const apiTokenQuote = process.env.API_TOKEN_QUOTE

  const url = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiTokenQuote}`

  // console.log('postAddTRansaction userId ' + arg.userId)
  await db.createTransaction(arg)

  const cash = await user.fetchCashUser(arg)
  console.log('fetchCashUser:' + typeof cash)
  console.log('fetchCashUser:' + JSON.stringify(cash))

  const updatedUserData = await user.updateCashToUser(arg, cash)
  console.log('updatedUserData:' + typeof updatedUserData)
  console.log('updatedUserData:' + JSON.stringify(updatedUserData))

  const data = await db.fetchWebApiQuote(url)
  res.render('buysell', {
    data: data,
    userData: updatedUserData
  })
}



