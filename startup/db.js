const mongoose = require('mongoose');

module.exports.connectDb = () => {
  mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
  // Connect to our Database and handle any bad connections

  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  //(node:571) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
  mongoose.set('useCreateIndex', true);

  return mongoose.connection.on('error', err => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
  });
};

// module.exports = {
//   connectDb
// };

// module.exports = function() {
//   mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
//   // Connect to our Database and handle any bad connections

//   mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   });

//   //(node:571) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
//   mongoose.set('useCreateIndex', true);

//   mongoose.connection.on('error', err => {
//     console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
//   });
// };
