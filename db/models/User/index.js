const axios = require('axios')
const moment = require('moment')

// const portfolio = require('../Portfolio')
// const user = require('../User')
const { User } = require('./User')

const fetchCash = async arg => {
  try {
    const orderType = arg.orderType
    const qty = parseInt(arg.qty)
    const price = parseFloat(arg.price)
    let transactionAmount = qty * price

    const query = { id: arg.userId }//Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).
    const projection = { _id: 0 }//	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.

    // let oldQty = await Portfolio.find(query, projection).select("qtyPorfolio")//find returns the Object in the Array [{}]
    const oldCash = await User.findOne(query, projection).select("cash")//findOne returns teh Object{} without the Array
    console.log('old qty:' + typeof oldCash)
    console.log('old qty:' + JSON.stringify(oldCash))

    if (orderType === 'Sell') transactionAmount = Math.abs(transactionAmount) * -1//converting positive Number to Negative Number in JavaScript
    const { cash } = oldCash
    console.log('old qty:' + JSON.stringify(cash))
    return newCash = cash + transactionAmount
  } catch (ex) {
    console.log(`fetchQtyPortfolio error: ${ex}`)
  }
}

const updateToUser = async (arg, cash) => {
  try {
    const stockUser = new User({
      id: arg.userId,
      cash: cash
    })

    const query = { id: stockUser.id }
    const update = {
      cash: stockUser.cash
    }
    // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    // upsert: bool - creates the object if it doesn't exist. defaults to false.
    const options = { upsert: true, new: true }

    const stockUserResult = await User.findOneAndUpdate(query, update, options)
    console.log("Saved portfolio to db Portfolio", stockUserResult.name)
  } catch (ex) {
    console.log(`addToPortfolio error: ${ex}`)
  }
}



module.exports = {
  fetchCash,
  updateToUser
}
