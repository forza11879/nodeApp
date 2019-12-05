// const findUserEmailDB = async email => {
//   try {
//     const query = { email: email };
//     const user = await User.findOne(query);
//     // .select('email'); //findOne() returns the Object{} without the Array vs find() Array[{}] of Objects
//     console.log(user);
//     return user;
//   } catch (ex) {
//     console.log(`findUserEmailDB error: ${ex}`);
//   }
// };

// const fetchUserDataDB = async userId => {
//   try {
//     const query = { _id: userId }; // Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).

//     const projection = { _id: 1 }; //	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.

//     const user = await User.findById(query, projection).select(
//       '_id name cash equity'
//     ); // findOne() returns the Object{} without the Array vs find() Array[{}] of Objects
//     return {
//       id: user._id,
//       name: user.name,
//       cash: parseFloat(user.cash),
//       equity: parseFloat(user.equity),
//     };
//   } catch (ex) {
//     console.log(`fetchUserDataDB error: ${ex}`);
//   }
// };

const mongodb = require('mongodb');

run().catch(error => console.log(error));

async function run() {
  const db = await mongodb.MongoClient.connect(
    'mongodb://localhost:27017/test',
    {
      useNewUrlParser: true,
      poolSize: 1, // Only 1 operation can run at a time
    }
  ).then(client => client.db());

  await db.dropDatabase();

  for (let i = 0; i < 10000; ++i) {
    await db.collection('Foo').insertOne({ _id: i });
  }
  console.log('Inserted foo docs');

  for (let i = 0; i < 10000; ++i) {
    await db.collection('Bar').insertOne({ _id: i, fooId: i });
  }
  console.log('Inserted bar docs');

  // This aggregation will be exceedingly slow because there's no index on
  // `fooId`. Instead, could replace this with Mongoose populate, which would
  // replace this aggregation into 2 faster `find()` operations.
  const promise = db
    .collection('Foo')
    .aggregate([
      {
        $lookup: {
          from: 'Bar',
          localField: '_id',
          foreignField: 'fooId',
          as: 'bars',
        },
      },
    ])
    .toArray();

  const startTime = Date.now();
  await db.collection('Test').findOne();

  // "Executed query in 301 ms"
  console.log('Executed query in', Date.now() - startTime, 'ms');
}

const mongodb = require('mongodb')

run().catch(error => console.log(error));

async function run() {
  const db = await mongodb.MongoClient.
    connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      poolSize: 1 // Only 1 operation can run at a time
    }).
    then(client => client.db());

  await db.dropDatabase();

  for (let i = 0; i < 10000; ++i) {
    await db.collection('Foo').insertOne({ _id: i });
  }
  console.log('Inserted foo docs');

  for (let i = 0; i < 10000; ++i) {
    await db.collection('Bar').insertOne({ _id: i, fooId: i });
  }
  console.log('Inserted bar docs');

  // Create an index on `fooId` before executing the query
  await db.collection('Bar').createIndex({ fooId: 1 });
  const promise = db.collection('Foo').aggregate([
    { $lookup: { from: 'Bar', localField: '_id', foreignField: 'fooId', as: 'bars' } }
  ]).toArray();

  const startTime = Date.now();
  await db.collection('Test').findOne();

  // "Executed query in 19 ms"
  console.log('Executed query in', Date.now() - startTime, 'ms');
}

const db = await mongodb.MongoClient.
connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  poolSize: 1 // Only 1 operation can run at a time
}).
then(client => client.db());

await db.dropDatabase();

for (let i = 0; i < 10000; ++i) {
await db.collection('Foo').insertOne({ _id: i });
}
console.log('Inserted foo docs');

for (let i = 0; i < 10000; ++i) {
await db.collection('Bar').insertOne({ _id: i, fooId: i });
}
console.log('Inserted bar docs');

// This aggregation will fail if it doesn't finish within 10ms
const promise = db.collection('Foo').
aggregate(
  [{ $lookup: { from: 'Bar', localField: '_id', foreignField: 'fooId', as: 'bars' } }],
  { maxTimeMS: 10 }
).
toArray().
catch(err => {}); // Ignore maxTimeMS error

const startTime = Date.now();
await db.collection('Test').findOne();

// "Executed query in 19 ms"
console.log('Executed query in', Date.now() - startTime, 'ms');
