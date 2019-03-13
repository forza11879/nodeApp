const mongoose = require('mongoose')

module.exports = function () {
  mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises
  // Connect to our Database and handle any bad connections
  mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true })
  //(node:571) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
  mongoose.set('useCreateIndex', true)

  mongoose.connection.on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
  })
}



