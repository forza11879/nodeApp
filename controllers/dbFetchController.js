const mongoose = require('mongoose')

const ParentSchemaSymbol = mongoose.model('Stock')

exports.getDbFetch = (req, res) => {
  // let curValueDbFetch = req.params.symbol
  let curValueDbFetch = req.params.symbol

  console.log(curValueDbFetch)


  const query = { symbol: `${curValueDbFetch}` }
  const projection = { _id: 0, data: 1 }

  ParentSchemaSymbol.findOne(query, projection).sort({ date: -1 }).then(doc => {
    let chartData = doc.data.map(item => {
      return {
        date: parseFloat(item.date), // the date
        open: parseFloat(item.open), // open
        high: parseFloat(item.high), // high
        low: parseFloat(item.low), // low
        close: parseFloat(item.close), // close
        volume: parseFloat(item.volume)//volume
      }
    })
    res.send(chartData)
  })
    .catch(e => {
      console.log(e)
    })
}

