/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const Pusher = require('pusher');
const mongoose = require('mongoose');

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
  // res.render('chart');
  res.render('chart', {
    symbol,
  });
};

exports.getWebApi = async (req, res) => {
  try {
    const { symbol } = req.params;
    const { changeStream } = req;

    console.log('on entry req.parms.symbol: ', symbol.green);
    console.log(typeof symbol);

    const apiKeyAlpha = process.env.API_KEY_ALPHAVANTAGE;
    // const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;

    const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKeyAlpha}`;

    // const urlCompact = `https://sandbox.iexapis.com/stable/stock/${symbol}/chart?token=${apiKey}`;

    const webApiData = await Db.fetchWebApiStock(urlCompact);
    await Db.creatStock(symbol, webApiData);

    changeStream.on('change', change => {
      // console.log('CHANGE JSON.stringify: ', JSON.stringify(change));
      // console.log('CHANGE console.log: ', change);
      console.log('req.params.symbol in change: ', symbol.green);

      const { operationType, fullDocument } = change;
      console.log('operationType: ', operationType.green);
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

      // if (operationType === 'update') {
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
      //   symbol: fullDocument.symbol,
      // });

      // const resumeToken = change._id;
      // console.log('changeStream: ', changeStream);

      // changeStream.close();

      // console.log('resumeToken: ', resumeToken);

      // const optionsNew = {
      //   resumeAfter: resumeToken,
      //   fullDocument: 'updateLookup',
      // };

      // const newChangeStream = Stock.watch([], optionsNew);

      // newChangeStream.on('change', next => {
      //   console.log('req.params.symbol in change NEXT: ', symbol);

      //   const operationTypeNext = next.operationType;
      //   const fullDocumentNext = next.fullDocument;

      //   console.log('operationType NEXT: ', operationTypeNext.green);

      //   const logDataNext = fullDocumentNext.data.map(item => ({
      //     date: parseFloat(item.date),
      //     open: parseFloat(item.open),
      //     high: parseFloat(item.high),
      //     low: parseFloat(item.low),
      //     close: parseFloat(item.close),
      //     volume: parseInt(item.volume),
      //   }));

      //   pusher.trigger(channel, 'AnyEvent', {
      //     // eslint-disable-next-line object-shorthand
      //     chartData: logDataNext,
      //     symbol: fullDocumentNext.symbol,
      //   });

      // newChangeStream.close();
      // });
      // }

      // if (operationType === 'insert') {
      //   // pusher.trigger(channel, 'inserted', {
      //   //   // eslint-disable-next-line object-shorthand
      //   //   chartData: logData,
      //   //   symbol: fullDocument.symbol,
      //   // });
      //   // console.log(`CHANGE insert : ${JSON.stringify(change).green}`);
      // }
      // if (operationType === 'update') {
      //   // console.log(`CHANGE Insert : ${JSON.stringify(fullDocument.data)}`);
      //   // pusher.trigger(channel, 'updated', {
      //   //   // eslint-disable-next-line object-shorthand
      //   //   chartData: logData,
      //   //   symbol: fullDocument.symbol,
      //   // });
      //   // console.log(`CHANGE update : ${JSON.stringify(change).green}`);
      // }
      // if (operationType === 'replace') {
      //   // pusher.trigger(channel, 'replaced', {
      //   //   // eslint-disable-next-line object-shorthand
      //   //   chartData: logData,
      //   //   symbol: fullDocument.symbol,
      //   // });
      //   // console.log(`CHANGE replace : ${JSON.stringify(change).green}`);
      //   // console.log(
      //   //   `CHANGE Replace : ${JSON.stringify(fullDocument.data[0]).green}`
      //   // );
      // }
      // if (
      //   operationType !== 'update' &&
      //   operationType !== 'insert' &&
      //   operationType !== 'replace'
      // )
      //   console.log(`CHANGE : ${JSON.stringify(change).green}`);
    });

    // changeStreamFunction();
    // setTimeout(changeStreamFunction, 55000);

    // setTimeout(function() {
    //   setInterval(changeStreamFunction, 55000);
    // }, 110000);

    // web push https://thecodebarbarian.com/sending-web-push-notifications-from-node-js.html
    console.log('symbol outside: ', symbol);

    res.send({
      webApiData: webApiData,
      symbol: symbol,
    });
    // res.send(webApiData);
  } catch (ex) {
    console.log(`getWebApi error: ${ex}`.red);
  }
};

exports.getWebApiStock = async (req, res) => {
  try {
    // const urlArray = await Db.generateUrlArrayStock();
    const urlArray = await Db.generateUrlArrayStockChart();
    // console.log('getWebApiStock urlArray: ', JSON.stringify(urlArray));

    const promises = urlArray.map(async item => ({
      symbol: item.symbol,
      webApiData: await Db.fetchWebApiStock(item.url),
    }));

    // Since MAP always return promises (if you use await), you have to wait for the array of promises to get resolved. You can do this with await Promise.all

    const promisesResult = await Promise.all(promises);

    await Promise.all(
      promisesResult.map(async item =>
        Db.creatStock(item.symbol, item.webApiData)
      )
    );

    res.sendStatus(200);
    // .json({
    //   success: true,
    //   data: promisesResult,
    // });
  } catch (error) {
    console.log('getWebApiStock error: ', error);
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
    console.log('getSearchWebApi error: ', ex);
  }
};
