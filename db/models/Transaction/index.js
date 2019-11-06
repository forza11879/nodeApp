const axios = require('axios');
const moment = require('moment');
//services
const portfolio = require('../Portfolio');
//models
const { Transaction } = require('./Transaction');
const { Stock } = require('../Stock/Stock');
const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');

const addTransaction = async (arg, userId, next) => {
  try {
    const { price, qty, orderType, symbol } = arg;

    // console.log('addTransaction symbol:' + typeof arg.symbol);
    // console.log('addTransaction symbol:' + JSON.stringify(arg.symbol));

    const query = { symbol: symbol }; //Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).

    const projection = { _id: 1 }; //	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.

    const symbolId = await Stock.findOne(query, projection);

    // const stockTransaction = new Transaction({
    //   price: price,
    //   qty: qty,
    //   orderType: orderType,
    //   userId: userId,
    //   symbolId: symbolId
    // });

    // stockTransaction.save();

    //error is catched by try/catch
    Transaction.create({
      price: price,
      qty: qty,
      orderType: orderType,
      userId: userId,
      symbolId: symbolId
    });

    const portfolioPosition = await portfolio.fetchPortfolioPosition(
      arg,
      userId,
      symbolId
    );

    // need await to wait for new data to update
    await portfolio.updateToPortfolio(portfolioPosition);
  } catch (ex) {
    console.log(`addTransaction error: ${ex}`);
    // next(new ErrorResponse(`Error: ${ex}`, 404));
    // next(ex);
  }
};

// const addTransaction = asyncHandler(async (arg, userId, next) => {
//   const { price, qty, orderType, symbol } = arg;
//   const query = { symbol: symbol };
//   const projection = { _id: 1 };
//   const symbolId = await Stock.findOne(query, projection);

//   Transaction.create({
//     price: price,
//     qty: qty,
//     orderType: orderType,
//     userId: userId,
//     symbolId: symbolId
//   });

//   const portfolioPosition = await portfolio.fetchPortfolioPosition(
//     arg,
//     userId,
//     symbolId
//   );

//   await portfolio.updateToPortfolio(portfolioPosition);
// });

const fetchWebApiQuote = async url => {
  try {
    const myJson = await axios.get(url);
    const myJsonData = myJson.data;
    return {
      symbol: myJsonData['symbol'],
      companyName: myJsonData['companyName'],
      latestPrice: myJsonData['latestPrice'],
      change: myJsonData['change'],
      latestUpdate: moment(myJsonData['latestUpdate'])
        .utcOffset(-240)
        .format('LLLL'),
      high: myJsonData['high'],
      low: myJsonData['low'],
      week52High: myJsonData['week52High'],
      week52Low: myJsonData['week52Low'],
      open: myJsonData['open'],
      previousClose: myJsonData['previousClose']
    };
  } catch (ex) {
    console.log(`fetchWebApiQuote error: ${ex}`);
  }
};

module.exports = {
  addTransaction,
  fetchWebApiQuote
};
