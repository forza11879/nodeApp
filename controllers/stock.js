/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const Db = require('../db/models/Stock');
const { Stock } = require('../db/models/Stock/Stock');

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
  const curValue = req.params.symbol;
  res.render('chart', {
    curValue,
  });
};

exports.getWebApi = async (req, res) => {
  try {
    const { symbol } = req.params;

    console.log(`${symbol} - seacrhBox value`);
    console.log(typeof symbol);

    const apiKey = process.env.API_KEY;

    const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`;

    const webApiData = await Db.fetchWebApi(urlCompact);
    await Db.creatStock(symbol, webApiData);

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

    console.log(`reqBody:${JSON.stringify(req.body)}`.green);
    console.log(`reqParamsSymbol:${symbol}`.green);

    const webApiData = await Db.searchWebApi(url);

    res.send(webApiData);
  } catch (ex) {
    console.log(`getSearchWebApi error: ${ex}`);
  }
};
