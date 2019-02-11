const mongoose = require('mongoose')

const ParentSchemaSymbol = mongoose.model('Stock')

exports.dbSearchApi = (req, res) => {

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