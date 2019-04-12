const { User } = require('./User')

const fetchCash = async arg => {
  try {
    const orderType = arg.orderType
    const qty = parseInt(arg.qty)
    const price = parseFloat(arg.price)
    let transactionAmount = qty * price
    console.log('fetchCash function for userId:' + arg.userId)

    const query = { _id: arg.userId }//Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).
    const projection = { _id: 1 }//	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.

    // let oldQty = await Portfolio.find(query, projection).select("qtyPorfolio")//find returns the Object in the Array [{}]
    const oldCash = await User.findOne(query, projection).select("cash")//findOne returns teh Object{} without the Array
    console.log('old cash:' + typeof oldCash)
    console.log('old cash:' + JSON.stringify(oldCash))

    if (orderType === 'Sell') transactionAmount = Math.abs(transactionAmount) * -1//converting positive Number to Negative Number in JavaScript
    const { cash } = oldCash
    console.log('destructor cash:' + JSON.stringify(cash))
    // console.log('ParseFloat cash:' + JSON.stringify(parseFloat(cash)))
    return newCash = parseFloat(cash) - transactionAmount
    // return newCash = cash - transactionAmount
  } catch (ex) {
    console.log(`fetchCash error: ${ex}`)
  }
}

const updateToUser = async (arg, cash) => {
  try {
    const stockUser = new User({
      _id: arg.userId,
      cash: cash
    })

    const query = { _id: stockUser._id }
    const update = {
      cash: stockUser.cash
    }
    // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    // upsert: bool - creates the object if it doesn't exist. defaults to false.
    const options = { upsert: true, new: true }

    const stockUserResult = await User.findOneAndUpdate(query, update, options)

    console.log("Saved user to db User", stockUserResult.name)
  } catch (ex) {
    console.log(`updateToUser error: ${ex}`)
  }
}



module.exports = {
  fetchCash,
  updateToUser
}
