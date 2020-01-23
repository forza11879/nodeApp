/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import axios from 'axios';
import moment from 'moment';
import { List } from './List.js';
import * as util from '../common/util.js';

const saveToDbList = async (symbol, userId) => {
  try {
    // console.log(`saveToDbList symbol: ${typeof symbol}`);
    // console.log(`saveToDbList symbol: ${symbol}`);

    const stockList = new List({
      data: { symbol }, // subDocuments accept objects I think so!!!
      userId: userId,
    });

    const query = { userId: stockList.userId };
    const update = { $addToSet: { data: stockList.data } };
    const options = { upsert: true, new: true };
    await List.findOneAndUpdate(query, update, options);
  } catch (ex) {
    console.log(`saveToDbList error: ${ex}`.red);
  }
};

const generateUrlArrayList = async userId => {
  try {
    const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;

    const query = { userId: userId };
    const projection = { _id: 0 };
    const dataFromDB = await List.findOne(query, projection).select('data');

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
    const dataDb = await List.find(query, projection);

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
    const data = await util.getWithRetry(url);

    return {
      // symbol: globalQuote['01. symbol'],
      symbol: data.symbol,
      open: data.open,
      high: data.high,
      low: data.low,
      price: data.latestPrice,
      volume: data.latestVolume,
      latestTrdDay: moment(parseFloat(data.latestUpdate))
        .utcOffset(-240)
        .format('lll'),
      previousClose: data.previousClose,
      change: data.change,
      changePercent: data.changePercent,
    };
  } catch (ex) {
    console.log(`fetchWebApiList error: ${ex}`);
  }
};

export {
  saveToDbList,
  fetchDataFromDbList,
  generateUrlArrayList,
  fetchWebApiList,
};
