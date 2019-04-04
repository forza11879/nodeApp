const mongoose = require('mongoose')

module.exports = function () {
  mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises
  // Connect to our Database and handle any bad connections

  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

    // mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ckbfd.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true`, { useNewUrlParser: true })

    // mongoose.connect(`mongodb+srv://forza11879:$DtlgNm7jJUKxlg1N@cluster0-ckbfd.mongodb.net/$tradingApp?retryWrites=true`, { useNewUrlParser: true })

  //(node:571) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
  mongoose.set('useCreateIndex', true)

  mongoose.connection.on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
  })
}



