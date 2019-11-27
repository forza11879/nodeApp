const assert = require('assert');
const client = require('mongodb').MongoClient;

let _db;
//
function initDb(callback) {
  if (_db) {
    console.warn('Trying to init DB again!');
    return callback(null, _db);
  }
  //
  function connected(err, db) {
    if (err) {
      return callback(err);
    }
    console.log(
      `DB initialized - connected to: ${process.env.MONGODB_URL.split('@')[1]}`
    );
    _db = db;
    return callback(null, _db);
  }

  client.connect(
    process.env.MONGODB_URL,
    {
      poolSize: 5,
      ssl: true,
    },
    connected
  );
}

//
function getDb() {
  assert.ok(_db, 'Db has not been initialized. Please called init first.');
  return _db;
}

module.exports = {
  getDb,
  initDb,
};

// https://itnext.io/how-to-share-a-single-database-connection-in-a-node-js-express-js-app-fcad4cbcb1e
