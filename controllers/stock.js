const Db = require('../db/models/Stock');

exports.getChart = (req, res) => {
  const curValue = req.params.symbol;
  res.render('chart', {
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

    console.log(`reqBody:${req.body}`);
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
