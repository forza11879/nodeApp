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

exports.getDbSearchApi = (req, res) => {

  let curValueDbSearch = req.params.symbol
  let queryRegex = `^${curValueDbSearch}`

  ParentSchemaSymbol.find({ symbol: { '$regex': queryRegex, '$options': 'i' } })
    .limit(10)
    .then(doc => {
      // console.log(doc)
      let chartData = doc.map(item => {
        return {
          symbol: item.symbol//symbol
        }
      })
      console.log(chartData)
      res.send(chartData)
    })
    .catch(e => {
      console.log(e)
    })
}

// ParentSchemaSymbol.find(
  //   { $text: { $search: `"${curValueDbSearch}"` } },
  //   { score: { $meta: 'textScore' } }
  // )
  //   .sort({
  //     score: { $meta: 'textScore' }
  //   })
  //   .then(doc => {
  //     // console.log(doc)
  //     let chartData = doc.map(item => {
  //       return {
  //         symbol: item.symbol//symbol
  //       }
  //     })
  //     console.log(chartData)
  //     res.send(chartData)
  //   })
  //   .catch(e => {
  //     console.log(e)
  //   })