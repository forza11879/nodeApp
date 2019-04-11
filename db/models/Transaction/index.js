const { Transaction } = require('./Transaction')

const createTransaction = async arg => {
  try {
    const stockTransaction = new Transaction({
      symbol: arg.symbol,
      price: arg.price,
      qty: arg.qty,
      orderType: arg.orderType
    })

    const stockTransactionResult = await stockTransaction.save()

    console.log("Saved transaction to db Transaction", stockTransactionResult.symbol)
  } catch (ex) {
    console.log(`createTransaction error: ${ex}`)
  }
}

module.exports = {
  createTransaction
}