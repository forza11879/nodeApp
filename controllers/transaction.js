const db = require('../db/models/Transaction')

exports.postAddTransaction = async (req, res) => {
   const arg = req.body
  await db.createTransaction(arg)
  res.render('home')
}



