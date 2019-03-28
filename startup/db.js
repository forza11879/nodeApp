const mongoose = require('mongoose')

module.exports = function () {
  mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises
  // Connect to our Database and handle any bad connections

  // mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true })

  mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ckbfd.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true`, { useNewUrlParser: true })

  // mongoose.connect(`mongodb+srv://forza11879:5wri7OAPlFLWbjSz@cluster0-nec26.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })

  //(node:571) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
  mongoose.set('useCreateIndex', true)

  mongoose.connection.on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
  })
}



