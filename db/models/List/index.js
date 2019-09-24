const axios = require('axios');
const moment = require('moment');
const { List } = require('./List');

const saveToDbList = async (symbol, userId) => {
  try {
    // console.log(`saveToDbList symbol: ${typeof symbol}`);
    // console.log(`saveToDbList symbol: ${symbol}`);
    // console.log(`saveToDbList userId: ${typeof userId}`);
    // console.log(`saveToDbList userId: ${userId}`);

    const stockList = new List({
      data: { symbol }, //subDocuments accept objects I think so!!!
      userId: userId
    });

    // console.log(`saveToDbList stockList: ${JSON.stringify(stockList)}`);
    // console.log(`saveToDbList stockList: ${JSON.stringify(stockList.data)}`);

    const query = { userId: stockList.userId };
    const update = { $addToSet: { data: stockList.data } };
    // const update = { data: stockList.data };
    const options = { upsert: true, new: true }; // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    // upsert: bool - creates the object if it doesn't exist. defaults to false.

    const stockResult = await List.findOneAndUpdate(query, update, options);
    console.log('Saved the symbol TO dbList', stockList.data);
    console.log('Symbol array', stockResult.data);
  } catch (ex) {
    console.log(`saveToDbList error: ${ex}`);
  }
};

const generateUrlArrayList = async userId => {
  try {
    const query = { userId: userId }; //Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).
    const projection = { _id: 0 }; //	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.

    const apiKey = process.env.API_TOKEN_QUOTE;

    const dataFromDB = await List.findOne(query, projection).select('data'); //findOne returns the Object{} without the Array

    console.log(`dataFromDB: ${JSON.stringify(dataFromDB)}`);

    return dataFromDB.data.map(
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
      latestTrdDay: moment(parseFloat(myJsonData['latestUpdate']))
        .utcOffset(-240)
        .format('lll'),
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
