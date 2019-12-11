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
    'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=aapl&outputsize=compact&apikey=6BUYSS9QR8Y9HH15'
  );
  const myJson = await response.json();

  console.log('result data one:', myJson['Time Series (Daily)']);

  const dataWebApi = Object.entries(myJson['Time Series (Daily)']).map(
    ([date, dateObj]) => ({
      date: Date.parse(date),
      open: Math.round(parseFloat(dateObj['1. open']) * 100) / 100,
      high: Math.round(parseFloat(dateObj['2. high']) * 100) / 100,
      low: Math.round(parseFloat(dateObj['3. low']) * 100) / 100,
      close: Math.round(parseFloat(dateObj['4. close']) * 100) / 100,
      volume: parseInt(dateObj['5. volume']),
      // parseInt vs unary plus  +dateObj["5. volume"]
    })
  );

  const dataWebApiW = Object.entries(myJson).map(
    item => console.log(item)
    // ([date, dateObj]) => ({
    //   date: Date.parse(date),
    //   open: Math.round(parseFloat(dateObj['1. open']) * 100) / 100,
    //   high: Math.round(parseFloat(dateObj['2. high']) * 100) / 100,
    //   low: Math.round(parseFloat(dateObj['3. low']) * 100) / 100,
    //   close: Math.round(parseFloat(dateObj['4. close']) * 100) / 100,
    //   volume: parseInt(dateObj['5. volume']),
    //   // parseInt vs unary plus  +dateObj["5. volume"]
    // })
  );
  console.log('result final:', dataWebApiW);
};
result();

// return Object.entries(response.data['Time Series (Daily)']).map(
//   ([date, dateObj]) => ({
//     date: Date.parse(date),
//     open: Math.round(parseFloat(dateObj['1. open']) * 100) / 100,
//     high: Math.round(parseFloat(dateObj['2. high']) * 100) / 100,
//     low: Math.round(parseFloat(dateObj['3. low']) * 100) / 100,
//     close: Math.round(parseFloat(dateObj['4. close']) * 100) / 100,
//     volume: parseInt(dateObj['5. volume']),
//     // parseInt vs unary plus  +dateObj["5. volume"]
//   })
// );

response.data['Time Series (Daily)'].map(([date, dateObj]) => ({
  date: Date.parse(date),
  open: Math.round(parseFloat(dateObj['1. open']) * 100) / 100,
  high: Math.round(parseFloat(dateObj['2. high']) * 100) / 100,
  low: Math.round(parseFloat(dateObj['3. low']) * 100) / 100,
  close: Math.round(parseFloat(dateObj['4. close']) * 100) / 100,
  volume: parseInt(dateObj['5. volume']),
  // parseInt vs unary plus  +dateObj["5. volume"]
}));
