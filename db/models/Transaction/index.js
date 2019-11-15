/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const axios = require('axios');
const moment = require('moment');
// services
const portfolio = require('../Portfolio');
// models
const { Transaction } = require('./Transaction');
const { Stock } = require('../Stock/Stock');
const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');

const addTransaction = async (arg, userId) => {
  try {
    const { price, qty, orderType, symbol } = arg;

    // console.log('addTransaction symbol:' + typeof arg.symbol);
    // console.log('addTransaction symbol:' + JSON.stringify(arg.symbol));

    const query = { symbol: symbol };
    const projection = { _id: 1 };
    const symbolId = await Stock.findOne(query, projection);

    arg.userId = userId;
    arg.symbolId = symbolId;

    // error is catched by try/catch
    Transaction.create({
      price: price,
      qty: qty,
      orderType: orderType,
      userId: userId,
      symbolId: symbolId,
    });

    await portfolio.fetchPortfolioPosition(arg);
  } catch (ex) {
    console.log(`addTransaction error: ${ex}`.red);
    // next(new ErrorResponse(`Error: ${ex}`, 404));
    // next(ex);
  }
};

const fetchWebApiQuote = async url => {
  try {
    const myJson = await axios.get(url);
    const myJsonData = myJson.data;
    return {
      symbol: myJsonData.symbol,
      companyName: myJsonData.companyName,
      latestPrice: myJsonData.latestPrice,
      change: myJsonData.change,
      latestUpdate: moment(myJsonData.latestUpdate)
        .utcOffset(-240)
        .format('LLLL'),
      high: myJsonData.high,
      low: myJsonData.low,
      week52High: myJsonData.week52High,
      week52Low: myJsonData.week52Low,
      open: myJsonData.open,
      previousClose: myJsonData.previousClose,
    };
  } catch (ex) {
    console.log(`fetchWebApiQuote error: ${ex}`.red);
  }
};

module.exports = {
  addTransaction,
  fetchWebApiQuote,
};
