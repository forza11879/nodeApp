/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const WebSocket = require('ws');

const Db = require('../db/models/Stock');
const { Stock } = require('../db/models/Stock/Stock');

const broadcast = (clients, message) => {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

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
    // const { changeStream } = req;

    console.log('on entry req.parms.symbol: ', symbol.green);
    console.log(typeof symbol);

    const apiKeyAlpha = process.env.API_KEY_ALPHAVANTAGE;
    // const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;

    const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKeyAlpha}`;

    // const urlCompact = `https://sandbox.iexapis.com/stable/stock/${symbol}/chart?token=${apiKey}`;

    const webApiData = await Db.fetchWebApiStock(urlCompact);
    await Db.createUpdateStock(symbol, webApiData);

    const pipeline = [
      {
        $match: {
          'ns.db': 'myapp',
          'ns.coll': 'stocks',
          // 'fullDocument.symbol': 'RY' || req.symbol,
        },
      },
    ];

    const options = { fullDocument: 'updateLookup' };
    const changeStream = Stock.watch(pipeline, options);

    changeStream.on('change', event => {
      const { operationType, fullDocument } = event;
      const symbolDb = event.fullDocument.symbol;

      if (symbol === symbolDb) {
        broadcast(req.app.locals.clients, JSON.stringify(fullDocument));
      }

      // if (operationType === 'update') {
      // }
    });

    // we need to handle the changeStream error separatley from try/catch to trap the errors
    changeStream.on('error', err => {
      console.log(err);
      changeStream.close();
      throw err;
    });
    // web push https://thecodebarbarian.com/sending-web-push-notifications-from-node-js.html

    res.send({
      webApiData: webApiData,
      symbol: symbol,
    });
  } catch (err) {
    console.log(`getWebApi error: ${err.stack}`.red);
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
        Db.createUpdateStock(item.symbol, item.webApiData)
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
