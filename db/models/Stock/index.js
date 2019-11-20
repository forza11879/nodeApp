/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const axios = require('axios');
const { Stock } = require('./Stock');

const searchWebApi = async url => {
  try {
    const response = await axios.get(url);

    const highLow = response.data.bestMatches.map(item => ({
      symbol: item['1. symbol'],
    }));
    console.log(highLow.green);
    return highLow;
  } catch (ex) {
    console.log(`searchWebApi error: ${ex}`.red);
  }
};

const fetchWebApi = async url => {
  try {
    const response = await axios.get(url);
    return Object.entries(response.data['Time Series (Daily)']).map(
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
  } catch (ex) {
    console.log(`fetchWebApi error: ${ex}`.red);
  }
};

const creatStock = async (symbol, webApiData) => {
  try {
    // console.log(`creatStock curValue: ${typeof webApiData[0].volume}`.green);
    // console.log(
    //   `creatStock curValue: ${JSON.stringify(webApiData[0].volume)}`.green
    // );

    const query = { symbol: symbol };
    const update = { $addToSet: { data: webApiData } };
    const options = { upsert: true, new: true };

    const stockResult = await Stock.findOneAndUpdate(query, update, options);

    const newOpen = webApiData[0].open.toString();
    const newHigh = webApiData[0].high.toString();
    const newLow = webApiData[0].low.toString();
    const newClose = webApiData[0].close.toString();
    const newVolume = webApiData[0].volume.toString();

    // console.log(`creatStock open: ${typeof newOpen}`.green);
    // console.log(`creatStock open: ${JSON.stringify(newOpen)}`.green);
    // console.log(`creatStock newHigh: ${typeof newHigh}`.green);
    // console.log(`creatStock newHigh: ${JSON.stringify(newHigh)}`.green);
    // console.log(`creatStock newLow: ${typeof newLow}`.green);
    // console.log(`creatStock newLow: ${JSON.stringify(newLow)}`.green);
    // console.log(`creatStock newClose: ${typeof newClose}`.green);
    // console.log(`creatStock newClose: ${JSON.stringify(newClose)}`.green);
    // console.log(`creatStock newVolume: ${typeof newVolume}`.green);
    // console.log(`creatStock newVolume: ${JSON.stringify(newVolume)}`.green);

    stockResult.data[0].open = newOpen;
    stockResult.data[0].high = newHigh;
    stockResult.data[0].low = newLow;
    stockResult.data[0].close = newClose;
    stockResult.data[0].volume = newVolume;

    await stockResult.save();
    // console.log(`creatStock curValue: ${typeof stockResult.data[0]}`.green);
    // console.log(
    //   `creatStock curValue: ${JSON.stringify(stockResult.data[0])}`.green
    // );

    // console.log(`creatStock curValue: ${typeof stockResult.data}`.green);
    // console.log(
    //   `creatStock curValue: ${JSON.stringify(stockResult.data)}`.green
    // );
  } catch (ex) {
    console.log(`creatStock error: ${ex}`.red);
  }
};

const fetchDb = async symbol => {
  try {
    const query = { symbol: symbol };
    const projection = { _id: 0, data: 1 };

    const chartData = await Stock.findOne(query, projection).sort({ date: -1 });
    console.log(`chartData in services:${JSON.stringify(chartData)}`.green);
    return chartData.data.map(item => ({
      date: parseFloat(item.date),
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseFloat(item.volume),
    }));
  } catch (ex) {
    console.log(`fetchDb error: ${ex}`.red);
  }
};

const dbSearchApi = async curValueDbSearch => {
  try {
    const queryRegex = `^${curValueDbSearch}`;
    const query = {
      symbol: { $regex: queryRegex, $options: 'i' },
    }; // Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).
    const searchBoxData = await Stock.find(query).limit(10);
    return searchBoxData.map(item => ({
      symbol: item.symbol,
    }));
  } catch (ex) {
    console.log(`dbSearchApi error: ${ex}`.red);
  }
};

// Stock.find(
//   { $text: { $search: `"${curValueDbSearch}"` } },
//   { score: { $meta: 'textScore' } }
// )
//   .sort({
//     score: { $meta: 'textScore' }
//   })

module.exports = {
  fetchWebApi,
  creatStock,
  fetchDb,
  dbSearchApi,
  searchWebApi,
};
