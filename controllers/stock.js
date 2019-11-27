/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const Pusher = require('pusher');
const mongoose = require('mongoose');
// const { initDbConnection } = require('../startup/dbm');
// const { getDb } = require('../startup/dbSS');

const Db = require('../db/models/Stock');
const { Stock } = require('../db/models/Stock/Stock');

// pusher
const pusher = new Pusher({
  appId: process.env.INSERT_APP_ID,
  key: process.env.INSERT_APP_KEY,
  secret: process.env.INSERT_APP_SECRET,
  cluster: process.env.INSERT_APP_CLUSTER,
  // encrypted: true,
  useTLS: true,
});
// pusher
const channel = 'myChannel';

exports.getSymbolId = async (req, res) => {
  try {
    const { symbol } = req.params;

    console.log(`getSymbolId symbol: ${typeof symbol}`.green);
    console.log(`getSymbolId symbol: ${JSON.stringify(symbol)}`.green);

    const query = { symbol };
    const projection = { _id: 1 };
    const symbolId = await Stock.findOne(query, projection);

    console.log(`getSymbolId symbol: ${typeof symbolId._id}`.green);
    console.log(`getSymbolId symbol: ${JSON.stringify(symbolId._id)}`.green);

    res.status(200).json({ data: symbolId._id });
  } catch (err) {
    console.log(`getSymbolId symbol Error: ${err}`.red);
  }
};

exports.getChart = (req, res) => {
  const { symbol } = req.params;
  res.render('chart', {
    symbol,
  });
};

exports.getWebApi = async (req, res) => {
  try {
    const { symbol } = req.params;

    // console.log(`result mongo controller ${resultM}`);
    // console.log(typeof resultM);

    // const apiKey = process.env.API_KEY;
    // const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;
    const apiKey = process.env.API_TOKEN_QUOTE;

    // const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`;

    // const urlCompact = `https://sandbox.iexapis.com/stable/stock/${symbol}/chart?token=${apiKey}`;

    const urlCompact = `https://cloud.iexapis.com/beta/stock/${symbol}/chart?token=${apiKey}`;

    const webApiData = await Db.fetchWebApi(urlCompact);
    // console.log(`web api data: ${JSON.stringify(webApiData)}`.red);
    await Db.creatStock(symbol, webApiData);

    const db = mongoose.connection;
    const taskCollection = db.collection('stocks');

    const pipeline = [
      // { fullDocument: 'updateLookup' },
      { $match: { 'fullDocument.symbol': symbol } },
    ];
    const changeStream = taskCollection.watch(
      // { fullDocument: 'updateLookup' },
      pipeline
    );
    changeStream.on('change', change => {
      console.log(`CHANGE route : ${JSON.stringify(change).green}`);
      const { operationType, fullDocument } = change;

      const logData = fullDocument.data.map(item => ({
        date: parseFloat(item.date),
        open: parseFloat(item.open),
        high: parseFloat(item.high),
        low: parseFloat(item.low),
        close: parseFloat(item.close),
        volume: parseInt(item.volume),
      }));

      pusher.trigger(channel, 'AnyEvent', {
        // eslint-disable-next-line object-shorthand
        chartData: logData,
        symbol: fullDocument.symbol,
      });

      if (operationType === 'insert') {
        // pusher.trigger(channel, 'inserted', {
        //   // eslint-disable-next-line object-shorthand
        //   chartData: logData,
        //   symbol: fullDocument.symbol,
        // });
        console.log(`CHANGE insert : ${JSON.stringify(change).green}`);
      }
      if (operationType === 'update') {
        // console.log(`CHANGE Insert : ${JSON.stringify(fullDocument.data)}`);
        // pusher.trigger(channel, 'updated', {
        //   // eslint-disable-next-line object-shorthand
        //   chartData: logData,
        //   symbol: fullDocument.symbol,
        // });
        console.log(`CHANGE update : ${JSON.stringify(change).green}`);
      }
      if (operationType === 'replace') {
        // pusher.trigger(channel, 'replaced', {
        //   // eslint-disable-next-line object-shorthand
        //   chartData: logData,
        //   symbol: fullDocument.symbol,
        // });
        console.log(`CHANGE replace : ${JSON.stringify(change).green}`);

        // console.log(
        //   `CHANGE Replace : ${JSON.stringify(fullDocument.data[0]).green}`
        // );
      }
      if (
        operationType !== 'update' &&
        operationType !== 'insert' &&
        operationType !== 'replace'
      )
        console.log(`CHANGE : ${JSON.stringify(change).green}`);
    });

    res.send(webApiData);
  } catch (ex) {
    console.log(`getWebApi error: ${ex}`.red);
  }
};

exports.getDbFetch = async (req, res) => {
  try {
    const { symbol } = req.params;
    console.log(symbol.green);

    const chartData = await Db.fetchDb(symbol);
    res.send(chartData);
  } catch (ex) {
    console.log(`getDbFetch error: ${ex}`.red);
  }
};

exports.getDbSearchApi = async (req, res) => {
  try {
    const { symbol } = req.params;

    const dbSearchApiData = await Db.dbSearchApi(symbol);

    res.send(dbSearchApiData);
  } catch (ex) {
    console.log(`getDbSearchApi error: ${ex}`.red);
  }
};

exports.getSearchWebApi = async (req, res) => {
  try {
    const { symbol } = req.params;

    const apiKeyGetSearchWebApi = process.env.API_KEY_GET_SEARCH_WEB_API;
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKeyGetSearchWebApi}`;

    // console.log(`reqBody:${JSON.stringify(req.body)}`.green);
    // console.log(`reqParamsSymbol:${symbol}`.green);

    const webApiData = await Db.searchWebApi(url);

    res.send(webApiData);
  } catch (ex) {
    console.log(`getSearchWebApi error: ${ex}`);
  }
};
