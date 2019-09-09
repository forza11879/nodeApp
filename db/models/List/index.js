const axios = require('axios');
const moment = require('moment');
const { List } = require('./List');

const saveToDbList = async (arg, userId) => {
  try {
    const stockList = new List({
      // symbol: arg.symbol,
      // open: arg.open,
      // high: arg.high,
      // low: arg.low,
      // price: arg.price,
      // volume: arg.volume,
      // latestTrdDay: arg.latestTrdDay,
      // previousClose: arg.previousClose,
      // change: arg.change,
      // changePercent: arg.changePercent,
      data: arg.symbol,
      userId: userId
    });

    // const query = { symbol: stockList.symbol };
    const query = { userId: stockList.userId };
    const update = { $addToSet: { data: stockList.data } };
    const options = { upsert: true, new: true };
    // const update = {
    //   open: stockList.open,
    //   high: stockList.high,
    //   low: stockList.low,
    //   price: stockList.price,
    //   volume: stockList.volume,
    //   latestTrdDay: stockList.latestTrdDay,
    //   previousClose: stockList.previousClose,
    //   change: stockList.change,
    //   changePercent: stockList.changePercent
    // };
    // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    // upsert: bool - creates the object if it doesn't exist. defaults to false.

    const stockResult = await List.findOneAndUpdate(query, update, options);
    console.log('Saved the symbol web TO dbList', stockResult.data);
  } catch (ex) {
    console.log(`saveToDbList error: ${ex}`);
  }
};

const generateUrlArrayList = async (query, projection) => {
  try {
    const apiKey = process.env.API_TOKEN_QUOTE;
    const dataFromDB = await List.find(query, projection).select('symbol');

    return dataFromDB.map(
      item =>
        `https://cloud.iexapis.com/beta/stock/${item.symbol}/quote?token=${apiKey}`
    );
  } catch (ex) {
    console.log(`generateUrlArrayList error: ${ex}`);
  }
};

const fetchDataFromDbList = async (query, projection) => {
  try {
    const item = await List.find(query, projection);

    return item.map(item => ({
      symbol: item.symbol, //symbol
      open: parseFloat(item.open), // open
      high: parseFloat(item.high), // high
      low: parseFloat(item.low), // low
      price: parseFloat(item.price), // price
      volume: parseInt(item.volume), // volume
      // latestTrdDay: new Date(parseFloat(item.latestTrdDay)).toDateString(), //latestTrdDay
      latestTrdDay: moment(parseFloat(item.latestTrdDay))
        .utcOffset(-240)
        .format('lll'),
      // latestTrdDay: moment(parseFloat(item.latestTrdDay)).format('lll'),
      previousClose: parseFloat(item.previousClose), //previousClose
      change: parseFloat(item.change),
      changePercent: parseFloat(item.changePercent) //previousClose
    }));
  } catch (ex) {
    console.log(`fetchDataFromDbList error: ${ex}`);
  }
};

const fetchWebApiList = async url => {
  try {
    const myJson = await axios.get(url);

    // const globalQuote = myJson.data['Global Quote'];
    const myJsonData = myJson.data;

    return {
      // symbol: globalQuote['01. symbol'],
      symbol: myJsonData['symbol'],
      open: myJsonData['open'],
      high: myJsonData['high'],
      low: myJsonData['low'],
      price: myJsonData['latestPrice'],
      volume: myJsonData['latestVolume'],
      latestTrdDay: myJsonData['latestUpdate'],
      previousClose: myJsonData['previousClose'],
      change: myJsonData['change'],
      changePercent: myJsonData['changePercent']
    };
  } catch (ex) {
    console.log(`fetchWebApiList error: ${ex}`);
  }
};

module.exports = {
  saveToDbList,
  fetchDataFromDbList,
  generateUrlArrayList,
  fetchWebApiList
};
