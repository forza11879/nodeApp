// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const assert = require('assert');
// const client = require('mongodb').MongoClient;
const mongoose = require('mongoose');

let _db;
//
function initDb(callback) {
  if (_db) {
    console.log(`Trying to init DB again!`.red);
    return callback(null, _db);
  }
  //
  function connected(err, db) {
    if (err) {
      return callback(err);
    }
    // console.log(
    //   `DB initialized - connected to: ${process.env.MONGODB_URL.split('@')[1]}`
    // );
    _db = db;
    return callback(null, _db);
  }

  const clientOption = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    poolSize: 10,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
    //   autoIndex: false, // By default, mongoose will automatically build indexes defined in your schema when it connects. This is great for development, but not ideal for large production deployments, because index builds can cause performance degradation. If you set autoIndex to false, mongoose will not automatically build indexes for any model associated with this connection.
  };

  mongoose.connect(process.env.MONGODB_URL, clientOption, connected);
}

//
function getDb() {
  assert.ok(_db, `Db has not been initialized. Please called init first.`.red);
  return _db;
}

module.exports = {
  getDb,
  initDb,
};

// https://itnext.io/how-to-share-a-single-database-connection-in-a-node-js-express-js-app-fcad4cbcb1e
