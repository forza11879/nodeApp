/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import WebSocket from 'ws';

import * as Stock from '../db/models/Stock/index.js';
import { Stock as StockModel } from '../db/models/Stock/Stock.js';

const broadcast = (clients, message) => {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

export const getChart = (req, res) => {
  const { symbol } = req.params;
  // res.render('chart');
  res.render('chart', {
    symbol,
  });
};

export const getWebApi = async (req, res) => {
  try {
    const { symbol } = req.params;
    // const { changeStream } = req;

    console.log('on entry req.parms.symbol: ', symbol.green);
    console.log(typeof symbol);

    const apiKeyAlpha = process.env.API_KEY_ALPHAVANTAGE;
    // const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;

    const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKeyAlpha}`;

    // const urlCompact = `https://sandbox.iexapis.com/stable/stock/${symbol}/chart?token=${apiKey}`;

    const webApiData = await Stock.fetchWebApiStock(urlCompact);
    await Stock.createUpdateStock(symbol, webApiData);

    // res.app.locals.symbol = symbol;
    // global.globalString = symbol;

    // console.log('req.fullDocument: ', req.fullDocument);

    // broadcast(req.app.locals.clients, JSON.stringify(req.fullDocument));

    // const pipeline = [
    //   {
    //     $match: {
    //       'ns.db': 'myapp',
    //       'ns.coll': 'stocks',
    //       // 'fullDocument.symbol': 'RY' || req.symbol,
    //     },
    //   },
    // ];

    // const options = { fullDocument: 'updateLookup' };
    // const changeStream = StockModel.watch(pipeline, options);

    // changeStream.on('change', event => {
    //   const { operationType, fullDocument } = event;
    //   const symbolDb = event.fullDocument.symbol;

    //   if (symbol === symbolDb) {
    //     broadcast(req.app.locals.clients, JSON.stringify(fullDocument));
    //   }

    //   // if (operationType === 'update') {
    //   // }
    // });

    // we need to handle the changeStream error separatley from try/catch to trap the errors
    // changeStream.on('error', err => {
    //   console.log(err);
    //   changeStream.close();
    //   throw err;
    // });
    // web push https://thecodebarbarian.com/sending-web-push-notifications-from-node-js.html

    res.send({
      webApiData: webApiData,
      symbol: symbol,
    });
  } catch (err) {
    console.log(`getWebApi error: ${err.stack}`.red);
  }
};

export const getWebApiStock = async (req, res) => {
  try {
    // const urlArray = await Db.generateUrlArrayStock();
    const urlArray = await Stock.generateUrlArrayStockChart();
    // console.log('getWebApiStock urlArray: ', JSON.stringify(urlArray));

    const promises = urlArray.map(async item => ({
      symbol: item.symbol,
      webApiData: await Stock.fetchWebApiStock(item.url),
    }));
    // .catch(error => console.log('getWebApiStock promises: ', error));
    // It does not work not sure why
    // Handling the error for each promise. If you need to execute all the promises even if some have failed, or maybe you can handle the failed promises later. https://www.freecodecamp.org/news/promise-all-in-javascript-with-example-6c8c5aea3e32/

    // Since MAP always return promises (if you use await), you have to wait for the array of promises to get resolved. You can do this with await Promise.all

    const promisesResult = await Promise.all(promises);

    await Promise.all(
      promisesResult.map(async item =>
        Stock.createUpdateStock(item.symbol, item.webApiData)
      )
      // .catch(error => console.log('getWebApiStock promisesResult: ', error))
      // It does not work not sure why
      // Handling the error for each promise. If you need to execute all the promises even if some have failed, or maybe you can handle the failed promises later.https://www.freecodecamp.org/news/promise-all-in-javascript-with-example-6c8c5aea3e32/
    );

    // const pipeline = [
    //   {
    //     $match: {
    //       'ns.db': 'myapp',
    //       'ns.coll': 'stocks',
    //       // 'fullDocument.symbol': 'RY' || req.symbol,
    //     },
    //   },
    // ];

    // const options = { fullDocument: 'updateLookup' };
    // const changeStream = StockModel.watch(pipeline, options);

    // changeStream.on('change', event => {
    //   const { operationType, fullDocument } = event;
    //   const symbolDb = event.fullDocument.symbol;
    //   console.log('symbolDb: ', symbolDb);
    //   broadcast(req.app.locals.clients, JSON.stringify(fullDocument));
    //   changeStream.close();

    //   // if (symbol === symbolDb) {
    //   //   broadcast(req.app.locals.clients, JSON.stringify(fullDocument));
    //   // }

    //   // if (operationType === 'update') {
    //   // }
    // });

    // we need to handle the changeStream error separatley from try/catch to trap the errors
    // changeStream.on('error', err => {
    //   console.log(err);
    //   changeStream.close();
    //   throw err;
    // });
    // web push https://thecodebarbarian.com/sending-web-push-notifications-from-node-js.html

    res.sendStatus(200);
    // .json({
    //   success: true,
    //   data: promisesResult,
    // });
  } catch (error) {
    console.log('getWebApiStock error: ', error);
  }
};

export const getDbFetch = async (req, res) => {
  try {
    const { symbol } = req.params;
    console.log(symbol.green);

    const chartData = await Stock.fetchDb(symbol);
    res.send(chartData);
  } catch (ex) {
    console.log(`getDbFetch error: ${ex}`.red);
  }
};

export const getDbSearchApi = async (req, res) => {
  try {
    const { symbol } = req.params;

    const dbSearchApiData = await Stock.dbSearchApi(symbol);

    res.send(dbSearchApiData);
  } catch (ex) {
    console.log(`getDbSearchApi error: ${ex}`.red);
  }
};

export const getSearchWebApi = async (req, res) => {
  try {
    const { symbol } = req.params;

    const apiKeyGetSearchWebApi = process.env.API_KEY_GET_SEARCH_WEB_API;
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKeyGetSearchWebApi}`;

    // console.log(`reqBody:${JSON.stringify(req.body)}`.green);
    // console.log(`reqParamsSymbol:${symbol}`.green);

    const webApiData = await Stock.searchWebApi(url);

    res.send(webApiData);
  } catch (ex) {
    console.log('getSearchWebApi error: ', ex);
  }
};
