const db = require('../db/models/Portfolio')

exports.getBuySellTicket = (req, res) => {
  const curValue = req.params.symbol
  res.render('buysell', {
    curValue: curValue
  })
}