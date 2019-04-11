exports.postAddTransaction = async (req, res) => {
  const arg = req.body

  const qtyPorfolio = await portfolio.fetchQtyPortfolio(arg)
  console.log('quantity portfolio ' + qtyPorfolio)

  res.render('buysell')
}