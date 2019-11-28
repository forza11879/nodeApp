// https://medium.com/@rajamanii/connecting-multiple-database-in-nodejs-with-mongodb-and-mongoose-d88574fcd5a3

// const taskCollection = db.collection('stocks');
// const changeStream = taskCollection.watch({ fullDocument: 'updateLookup' });

// changeStream.on('change', change => {
//   const { operationType, fullDocument } = change;

//   const logData = fullDocument.data.map(item => ({
//     date: parseFloat(item.date),
//     open: parseFloat(item.open),
//     high: parseFloat(item.high),
//     low: parseFloat(item.low),
//     close: parseFloat(item.close),
//     volume: parseInt(item.volume),
//   }));

//   // console.log(`CHANGE : ${JSON.stringify(change).green}`);

//   pusher.trigger(channel, 'AnyEvent', {
//     // eslint-disable-next-line object-shorthand
//     chartData: logData,
//     symbol: fullDocument.symbol,
//   });

//   // pusher.trigger(channel, 'AnyEvent', {
//   //   // eslint-disable-next-line object-shorthand
//   //   chartData: logData,
//   //   symbol: fullDocument.symbol,
//   // });

//   //     // if (operationType === 'insert') {
//   //     //   pusher.trigger(channel, 'inserted', {
//   //     //     // eslint-disable-next-line object-shorthand
//   //     //     chartData: logData,
//   //     //   });
//   //     //   // console.log(
//   //     //   //   `CHANGE Insert : ${JSON.stringify(change.fullDocument.data[0]).green}`
//   //     //   // );
//   //     // }
//   //     // if (operationType === 'update') {
//   //     //   // console.log(`CHANGE Insert : ${JSON.stringify(fullDocument.data)}`);
//   //     //   pusher.trigger(channel, 'updated', {
//   //     //     // eslint-disable-next-line object-shorthand
//   //     //     chartData: logData,
//   //     //   });
//   //     //   //   console.log(
//   //     //   //   `CHANGE Update lastElement : ${JSON.stringify(lastElement).green}`
//   //     //   // );
//   //     //   // console.log(
//   //     //   //   `CHANGE Update updatedFields : ${
//   //     //   //     JSON.stringify(
//   //     //   //       change.updateDescription.updatedFields.data[lastElement]
//   //     //   //     ).green
//   //     //   //   }`
//   //     //   // );
//   //     //   // console.log(
//   //     //   //   `CHANGE Update removedFields : ${
//   //     //   //     JSON.stringify(change.updateDescription.removedFields).green
//   //     //   //   }`
//   //     //   // );
//   //     // }
//   //     // if (operationType === 'replace') {
//   //     //   pusher.trigger(channel, 'replaced', {
//   //     //     // eslint-disable-next-line object-shorthand
//   //     //     chartData: logData,
//   //     //   });

//   //     //   // console.log(
//   //     //   //   `CHANGE Replace : ${JSON.stringify(fullDocument.data[0]).green}`
//   //     //   // );
//   //     // }
//   //     // if (
//   //     //   operationType !== 'update' &&
//   //     //   operationType !== 'insert' &&
//   //     //   operationType !== 'replace'
//   //     // )
//   //     //   console.log(`CHANGE : ${JSON.stringify(change).green}`);

//   //     // if (change.operationType === 'insert') {
//   //     //   const task = change.fullDocument;
//   //     //   pusher.trigger(channel, 'inserted', {
//   //     //     // eslint-disable-next-line object-shorthand
//   //     //     task: task,
//   //     //   });
//   //     // } else if (change.operationType === 'delete') {
//   //     //   pusher.trigger(channel, 'deleted', change.documentKey._id);
//   //     // }
