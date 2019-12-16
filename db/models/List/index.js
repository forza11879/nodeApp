/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const mongoose = require('mongoose');
const axios = require('axios');
const moment = require('moment');

const { List } = require('./List');

const model = mongoose.models;

const saveToDbList = async (symbol, userId) => {
  try {
    const stockList = new List({
      data: { symbol }, // subDocuments accept objects I think so!!!
      userId: userId,
    });

    const query = { userId: stockList.userId };
    const update = { $addToSet: { data: stockList.data } };
    const options = { upsert: true, new: true };

    await model.List.findOneAndUpdate(query, update, options);
  } catch (ex) {
    console.log(`saveToDbList error: ${ex}`.red);
  }
};

const generateUrlArrayList = async userId => {
  try {
    const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;

    const query = { userId: userId };
    const projection = { _id: 0 };
    const dataFromDB = await model.List.findOne(query, projection).select(
      'data'
    );

    return dataFromDB.data.map(
      item =>
        `https://sandbox.iexapis.com/stable/stock/${item.symbol}/quote?token=${apiKey}`
    );
  } catch (ex) {
    console.log(`generateUrlArrayList error: ${ex}`.red);
  }
};

const fetchDataFromDbList = async (query, projection) => {
  try {
    const dataDb = await model.List.find(query, projection);

    return dataDb.map(item => ({
      symbol: item.symbol, // symbol
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
      previousClose: parseFloat(item.previousClose), // previousClose
      change: parseFloat(item.change),
      changePercent: parseFloat(item.changePercent), // previousClose
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
      symbol: myJsonData.symbol,
      open: myJsonData.open,
      high: myJsonData.high,
      low: myJsonData.low,
      price: myJsonData.latestPrice,
      volume: myJsonData.latestVolume,
      latestTrdDay: moment(parseFloat(myJsonData.latestUpdate))
        .utcOffset(-240)
        .format('lll'),
      previousClose: myJsonData.previousClose,
      change: myJsonData.change,
      changePercent: myJsonData.changePercent,
    };
  } catch (ex) {
    console.log(`fetchWebApiList error: ${ex}`);
  }
};

module.exports = {
  saveToDbList,
  fetchDataFromDbList,
  generateUrlArrayList,
  fetchWebApiList,
};
