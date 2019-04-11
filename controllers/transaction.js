const db = require('../db/models/Transaction')

exports.postAddTransaction = async (req, res) => {
  // const symbol = req.body.symbol
  // const price = req.body.price
  // const qty = req.body.qty
  // const orderType = req.body.orderType
  const arg = req.body

  await db.createTransaction(arg)
  res.render('buysell/${symbol}')
}



