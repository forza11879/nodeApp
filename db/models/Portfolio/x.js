function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false
  }
  return true
}

const fetchQtyPortfolio = async (arg) => {
  try {
    const orderType = arg.orderType
    let qty = arg.qty

    const query = { symbol: arg.symbol }
    const projection = { _id: 0 }

    const oldQty = await Portfolio.findOne(query, projection).select("qtyPorfolio")
    //findOne returns teh Object{} without the Array
    console.log('old qty:' + typeof oldQty)
    console.log('old qty:' + JSON.stringify(oldQty))

    if (isEmpty(oldQty)) {
      // Object is empty (Would return true in this example)
      return qty
    } else {
      // Object is NOT empty
      if (orderType === 'Sell') qty = Math.abs(qty) * -1
      const { qtyPorfolio } = oldQty
      return newQty = qtyPorfolio + qty
    }
  } catch (ex) {
    console.log(`fetchQtyPortfolio error: ${ex}`)
  }
}


const fetchQtyPortfolio = async (arg) => {
  const query = { symbol: arg.symbol }
  const projection = { _id: 0 }

  const orderType = arg.orderType
  console.log('order type:' + orderType)

  const qty = arg.qty
  console.log('new qty:' + qty)

  const oldQty = await Portfolio.find(query, projection).select("qtyPorfolio")
  console.log('old qty:' + oldQty)

  if (!oldQty) oldQty = 0
  if (orderType === 'Sell') qty = ~qty + 1// To get a negative version of a number in JavaScript
  // if (orderType == 'Sell') qty = qty / -1
  // if(orderType == 'Sell') qty = qty - (qty * 2) //The basic formula to reverse positive to negative or negative to positive
  console.log('new qty after minus if orderType is Sell:' + qty)
  return newQty = oldQty + qty
}

const oldQtyValue = Object.values(oldQty[0])
return newQty = oldQtyValue + qty