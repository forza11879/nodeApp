const Db = require("../db/models/Stock");
const { Stock } = require("../db/models/Stock/Stock");

exports.getSymbolId = async (req, res) => {
  try {
    const { symbol } = req.params;

    console.log("getSymbolId symbol:" + typeof symbol);
    console.log("getSymbolId symbol:" + JSON.stringify(symbol));

    const query = { symbol: symbol }; //Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).

    const projection = { _id: 1 }; //	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.

    const symbolId = await Stock.findOne(query, projection);
    console.log("getSymbolId symbol:" + typeof symbolId._id);
    console.log("getSymbolId symbol:" + JSON.stringify(symbolId._id));

    console.log("getSymbolId req.params:" + typeof req.params);
    console.log("getSymbolId req.params:" + JSON.stringify(req.params));

    req.params.symbol = symbolId._id;

    console.log("getSymbolId req.params after:" + typeof req.params);
    console.log("getSymbolId req.params:after " + JSON.stringify(req.params));

    res.status(200).json({ data: symbolId._id });
  } catch (err) {
    console.log(`getSymbolId symbol Error: ${err}`);
  }
};

exports.getChart = (req, res) => {
  const curValue = req.params.symbol;
  res.render("chart", {
    curValue: curValue
  });
};

exports.getWebApi = async (req, res) => {
  try {
    const curValue = req.params.symbol;
    console.log(`${curValue} - seacrhBox value`);
    console.log(typeof curValue);
    const apiKey = process.env.API_KEY;
    const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${curValue}&outputsize=compact&apikey=${apiKey}`;

    const webApiData = await Db.fetchWebApi(urlCompact);
    await Db.creatStock(curValue, webApiData);

    res.send(webApiData);
  } catch (ex) {
    console.log(`getWebApi error: ${ex}`);
  }
};

exports.getDbFetch = async (req, res) => {
  try {
    const curValueDbFetch = req.params.symbol;
    console.log(curValueDbFetch);

    const query = { symbol: curValueDbFetch };
    const projection = { _id: 0, data: 1 };

    const chartData = await Db.fetchDb(query, projection);
    res.send(chartData);
  } catch (ex) {
    console.log(`getDbFetch error: ${ex}`);
  }
};

exports.getDbSearchApi = async (req, res) => {
  try {
    const curValue = req.params.symbol;
    const dbSearchApiData = await Db.dbSearchApi(curValue);
    // const obj = {
    //   dbSearchApiData: dbSearchApiData,
    //   curValue: curValue
    // };
    // res.send(obj);
    res.send(dbSearchApiData);
    // res.render('chart', {
    //   dbSearchApiData: dbSearchApiData,
    //   curValue: curValue
    // });
  } catch (ex) {
    console.log(`getDbSearchApi error: ${ex}`);
  }
};

exports.getSearchWebApi = async (req, res) => {
  try {
    const curValue = req.params.symbol;
    const apiKeyGetSearchWebApi = process.env.API_KEY_GET_SEARCH_WEB_API;
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${curValue}&apikey=${apiKeyGetSearchWebApi}`;

    console.log(`reqBody:${JSON.stringify(req.body)}`);
    console.log(`reqParamsSymbol:${req.params.symbol}`);

    const webApiData = await Db.searchWebApi(url);

    // const obj = {
    //   webApiData: webApiData,
    //   curValue: curValue
    // };

    res.send(webApiData);
    // res.send(obj);
    // res.render('chart', {
    //   webApiData: webApiData,
    //   curValue: curValue
    // });
  } catch (ex) {
    console.log(`getSearchWebApi error: ${ex}`);
  }
};
