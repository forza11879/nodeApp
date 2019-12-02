// const update = {
//   $addToSet: { data: webApiData },
//   $set: { 'data[0].$.volume': newVolume },
// };

// const creatStock = async (symbol, webApiData) => {
//   try {
//     // console.log(`creatStock curValue: ${typeof webApiData[0].volume}`.green);
//     // console.log(
//     //   `creatStock curValue: ${JSON.stringify(webApiData[0].volume)}`.green
//     // );

//     const query = { symbol };
//     const update = { $addToSet: { data: webApiData } };
//     const options = { upsert: true, new: true };

//     const stockResult = await Stock.findOneAndUpdate(query, update, options);

//     const newOpen = webApiData[0].open.toString();
//     const newHigh = webApiData[0].high.toString();
//     const newLow = webApiData[0].low.toString();
//     const newClose = webApiData[0].close.toString();
//     const newVolume = webApiData[0].volume.toString();

//     // console.log(`creatStock open: ${typeof newOpen}`.green);
//     // console.log(`creatStock open: ${JSON.stringify(newOpen)}`.green);
//     // console.log(`creatStock newHigh: ${typeof newHigh}`.green);
//     // console.log(`creatStock newHigh: ${JSON.stringify(newHigh)}`.green);
//     // console.log(`creatStock newLow: ${typeof newLow}`.green);
//     // console.log(`creatStock newLow: ${JSON.stringify(newLow)}`.green);
//     // console.log(`creatStock newClose: ${typeof newClose}`.green);
//     // console.log(`creatStock newClose: ${JSON.stringify(newClose)}`.green);
//     // console.log(`creatStock newVolume: ${typeof newVolume}`.green);
//     // console.log(`creatStock newVolume: ${JSON.stringify(newVolume)}`.green);

//     stockResult.data[0].open = newOpen;
//     stockResult.data[0].high = newHigh;
//     stockResult.data[0].low = newLow;
//     stockResult.data[0].close = newClose;
//     stockResult.data[0].volume = newVolume;

//     await stockResult.save();
//     // console.log(`creatStock curValue: ${typeof stockResult.data[0]}`.green);
//     // console.log(
//     //   `creatStock curValue: ${JSON.stringify(stockResult.data[0])}`.green
//     // );

//     // console.log(`creatStock curValue: ${typeof stockResult.data}`.green);
//     // console.log(
//     //   `creatStock curValue: ${JSON.stringify(stockResult.data)}`.green
//     // );
//   } catch (ex) {
//     console.log(`creatStock error: ${ex}`.red);
//   }
// };

// const creatStock = async (symbol, webApiData) => {
//   try {
//     const query = { symbol };
//     const position = await Stock.findOne(query);

//     if (!position) {
//       console.log('New stock'.green);
//       return Stock.create({
//         symbol,
//         data: webApiData,
//       });
//     }

//     position.data = webApiData;

//     await position.save();
//   } catch (ex) {
//     console.log(`creatStock error: ${ex}`.red);
//   }
// };

// Mongoose: tests.remove({}, {})
// Mongoose: tests.insert({ name: 'john doe', phone: '+12345678901', _id: ObjectId("596efb0ec941ff0ec319ac1e"), __v: 0 })
// {
//   "__v": 0,
//   "name": "john doe",
//   "phone": "+12345678901",
//   "_id": "596efb0ec941ff0ec319ac1e"
// }
// Mongoose: tests.findAndModify({ _id: ObjectId("596efb0ec941ff0ec319ac1e") }, [], { '$set': { name: 'Bill S. Preston' } }, { new: true, upsert: false, remove: false, fields: {} })
// {
//   "_id": "596efb0ec941ff0ec319ac1e",
//   "name": "Bill S. Preston",
//   "phone": "+12345678901",
//   "__v": 0
// }
// Mongoose: tests.findAndModify({ _id: ObjectId("596efb0ec941ff0ec319ac1e") }, [], { name: 'Dan Smith' }, { new: true, overwrite: true, upsert: false, remove: false, fields: {} })
// {
//   "_id": "596efb0ec941ff0ec319ac1e",
//   "name": "Dan Smith"
// }

// db.survey.update( // select your doc in moongo
//     { }, // your query, usually match by _id
//     { $pull: { results: { $elemMatch: { score: 8 , item: "B" } } } }, // item(s) to match from array you want to pull/remove
//     { multi: true } // set this to true if you want to remove multiple elements.
// )

// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema;

// var favorite = new Schema({
//     cn: String,
//     favorites: Array
// });

// module.exports = mongoose.model('Favorite', favorite, 'favorite');

// exports.deleteFavorite = function (req, res, next) {
//     if (req.params.callback !== null) {
//         res.contentType = 'application/javascript';
//     }
//     Favorite.find({cn: req.params.name}, function (error, docs) {
//         var records = {'records': docs};
//         if (error) {
//             process.stderr.write(error);
//         }
//         docs[0]._doc.favorites.remove({uid: req.params.deleteUid});

//         Favorite.save(function (error, docs) {
//             var records = {'records': docs};
//             if (error) {
//                 process.stderr.write(error);
//             }
//             res.send(records);

//             return next();
//         });
//     });
// };
const result = async () => {
  const response = await fetch(
    'https://cloud.iexapis.com/v1/stock/MSFT/chart?token=pk_0f5e9e6bca7548918adc6512bcb57ff4'
  );
  const myJson = await response.json();

  console.log('result data:', myJson);

  const dataWebApi = myJson.map(item => ({
    date: Date.parse(item.date),
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
    volume: item.volume,
  }));
  console.log('result data:', JSON.stringify(dataWebApi));
};

result();

//     const arrayResult = [];
// const objResult = {};
// objResult["01"] = nieto.label;
// objResult["02"] = nieto.value;
// arrayResult.push(objResult);

//   return async () => {
//     for await (const item of myJson) {
//       return {
//         date: Date.parse(item.date),
//         open: item.open,
//         high: item.high,
//         low: item.low,
//         close: item.close,
//         volume: item.volume
//       };
//     }
//   };
// };

result().then(item => console.log('result data:', JSON.stringify(item)));

// var res = result();
// console.log('result data:' + JSON.stringify(res))

// result().then(item => console.log('result data:', item));

// const res = result();
// console.log('result data:', res);

// result().then(
//   item => console.log(JSON.stringify(`result data: ${item}`))
//   //   console.log(`result data: ${item}`)
// );

// result().then(item => console.log('result data:', item));

// // const p = Promise.resolve(result());
// // p.then(function(v) {
// //   console.log('fetchWebApiStock result data: ', v);
// // });

// //   myJson.map(item => ({
// //     date: Date.parse(item.date),
// //     open: item.open,
// //     high: item.high,
// //     low: item.low,
// //     close: item.close,
// //     volume: item.volume,
// //     // parseInt vs unary plus  +dateObj["5. volume"]
// //   }));

// //   return {
// //     // date: Date.parse(myJson.date),
// //     open: myJson.open,
// //     high: myJson.high,
// //     low: myJson.low,
// //     close: myJson.close,
// //     volume: myJson.volume,
// //   };

// // const res = result();
// // console.log(JSON.stringify(`result data: ${res}`));

// // console.log('result data:', res);
// //
// // console.log(JSON.stringify(`result data: ${getResult}`));
// // console.log(`result data: ${getResult}`);

// // const p = Promise.resolve(result());
// // p.then(function(v) {
// //   console.log(JSON.stringify(`fetchWebApiStock result data: ${v}`));
// // });

// //   const result = myJson.map(item => ({
// //     date: Date.parse(item.date),
// //     open: item.open,
// //     high: item.high,
// //     low: item.low,
// //     close: item.close,
// //     volume: item.volume,
// //     // parseInt vs unary plus  +dateObj["5. volume"]
// //   }));
