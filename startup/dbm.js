// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const mongoose = require('mongoose');
// const Pusher = require('pusher');

// pusher
// const pusher = new Pusher({
//   appId: process.env.INSERT_APP_ID,
//   key: process.env.INSERT_APP_KEY,
//   secret: process.env.INSERT_APP_SECRET,
//   cluster: process.env.INSERT_APP_CLUSTER,
//   useTLS: true,
// });
// const channel = 'myChannel';

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

const initDbConnection = async () => {
  try {
    //   mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
    // Connect to our Database and handle any bad connections
    await mongoose.connect(process.env.MONGODB_URL, clientOption);
    mongoose.set('useCreateIndex', true);

    const db = mongoose.connection;

    db.once('open', () => {
      const taskCollection = db.collection('stocks');
      // const pipeline = [
      //   {
      //     $match: { symbol: req.params.symbol },
      //   },
      // ];
      const changeStream = taskCollection.watch(
        { fullDocument: 'updateLookup' }
        // pipeline
      );
      changeStream.on('change', change => {
        // const { operationType, fullDocument } = change;

        // console.log(`CHANGE : ${JSON.stringify(change).green}`);
        console.log(`CHANGE : ${change}`.green);

        // const logData = fullDocument.data.map(item => ({
        //   date: parseFloat(item.date),
        //   open: parseFloat(item.open),
        //   high: parseFloat(item.high),
        //   low: parseFloat(item.low),
        //   close: parseFloat(item.close),
        //   volume: parseInt(item.volume),
        // }));

        // pusher.trigger(channel, 'AnyEvent', {
        //   // eslint-disable-next-line object-shorthand
        //   chartData: logData,
        // });
      });
    });

    return db.on('error', err => {
      console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`.red);
    });
  } catch (err) {
    console.log(`error initDbConnection : ${err}`.red);
  }
};

module.exports = {
  initDbConnection,
};

// https://medium.com/@rajamanii/connecting-multiple-database-in-nodejs-with-mongodb-and-mongoose-d88574fcd5a3

// db.once('open', function() {
//     console.log('client MongoDB Connection ok!');

//     const taskCollection = db.collection('stocks');
//     const changeStream = taskCollection.watch({ fullDocument: 'updateLookup' });

//     changeStream.on('change', change => {
//       const { operationType, fullDocument } = change;

//       const logData = fullDocument.data.map(item => ({
//         date: parseFloat(item.date),
//         open: parseFloat(item.open),
//         high: parseFloat(item.high),
//         low: parseFloat(item.low),
//         close: parseFloat(item.close),
//         volume: parseInt(item.volume),
//       }));

//       // console.log(`CHANGE : ${JSON.stringify(change).green}`);

//       pusher.trigger(channel, 'AnyEvent', {
//         // eslint-disable-next-line object-shorthand
//         chartData: logData,
//         symbol: fullDocument.symbol,
//       });

//       // pusher.trigger(channel, 'AnyEvent', {
//       //   // eslint-disable-next-line object-shorthand
//       //   chartData: logData,
//       //   symbol: fullDocument.symbol,
//       // });

//       //     // if (operationType === 'insert') {
//       //     //   pusher.trigger(channel, 'inserted', {
//       //     //     // eslint-disable-next-line object-shorthand
//       //     //     chartData: logData,
//       //     //   });
//       //     //   // console.log(
//       //     //   //   `CHANGE Insert : ${JSON.stringify(change.fullDocument.data[0]).green}`
//       //     //   // );
//       //     // }
//       //     // if (operationType === 'update') {
//       //     //   // console.log(`CHANGE Insert : ${JSON.stringify(fullDocument.data)}`);
//       //     //   pusher.trigger(channel, 'updated', {
//       //     //     // eslint-disable-next-line object-shorthand
//       //     //     chartData: logData,
//       //     //   });
//       //     //   //   console.log(
//       //     //   //   `CHANGE Update lastElement : ${JSON.stringify(lastElement).green}`
//       //     //   // );
//       //     //   // console.log(
//       //     //   //   `CHANGE Update updatedFields : ${
//       //     //   //     JSON.stringify(
//       //     //   //       change.updateDescription.updatedFields.data[lastElement]
//       //     //   //     ).green
//       //     //   //   }`
//       //     //   // );
//       //     //   // console.log(
//       //     //   //   `CHANGE Update removedFields : ${
//       //     //   //     JSON.stringify(change.updateDescription.removedFields).green
//       //     //   //   }`
//       //     //   // );
//       //     // }
//       //     // if (operationType === 'replace') {
//       //     //   pusher.trigger(channel, 'replaced', {
//       //     //     // eslint-disable-next-line object-shorthand
//       //     //     chartData: logData,
//       //     //   });

//       //     //   // console.log(
//       //     //   //   `CHANGE Replace : ${JSON.stringify(fullDocument.data[0]).green}`
//       //     //   // );
//       //     // }
//       //     // if (
//       //     //   operationType !== 'update' &&
//       //     //   operationType !== 'insert' &&
//       //     //   operationType !== 'replace'
//       //     // )
//       //     //   console.log(`CHANGE : ${JSON.stringify(change).green}`);

//       //     // if (change.operationType === 'insert') {
//       //     //   const task = change.fullDocument;
//       //     //   pusher.trigger(channel, 'inserted', {
//       //     //     // eslint-disable-next-line object-shorthand
//       //     //     task: task,
//       //     //   });
//       //     // } else if (change.operationType === 'delete') {
//       //     //   pusher.trigger(channel, 'deleted', change.documentKey._id);
//       //     // }
//     });
