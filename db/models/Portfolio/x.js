function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false
  }
  return true
}

const fetchQtyPortfolio = async (arg) => {
  try {
    const query = { symbol: arg.symbol }
    const projection = { _id: 0 }

    const orderType = arg.orderType
    console.log('order type:' + orderType)// Sell

    let qty = arg.qty
    console.log('new qty:' + qty)// 300

    let oldQty = await Portfolio.find(query, projection).select("qtyPorfolio")
    console.log('old qty:' + typeof oldQty)// object
    console.log('old qty:' + oldQty.toString()) // {qtyPorfolio: 500}
    console.log('old qty:' + JSON.stringify(oldQty))

    if (isEmpty(oldQty)) {// false
      // Object is empty (Would return true in this example)
      console.log('new qty:' + qty)
      return qty
    } else {
      // Object is NOT empty
      if (orderType === 'Sell') qty = Math.abs(qty) * -1
      console.log('new qty after minus:' + qty)// -300
      const { qtyPorfolio } = oldQty//???
      console.log('qtyPorfolio :' + qtyPorfolio)// does NOT print
      console.log('qtyPorfolio :' + typeof qtyPorfolio)// does NOT print
      return newQty = qtyPorfolio + qty// ???
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