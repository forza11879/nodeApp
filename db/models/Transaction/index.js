/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
import colors from 'colors';

import axios from 'axios';
import moment from 'moment';
// services
import * as portfolio from '../Portfolio/index.js';
// models
import { Transaction } from './Transaction.js';
import { Stock } from '../Stock/Stock.js';
import { ErrorResponse } from '../../../utils/errorResponse.js';
import { asyncHandler } from '../../../middleware/async.js';

const addTransaction = async (arg, userId, webApiDataReversed) => {
  try {
    const { price, qty, orderType, symbol } = arg;

    const query = { symbol: symbol };
    const projection = { _id: 1 };
    const symbolId = await Stock.findOne(query, projection);

    const lastIndex = webApiDataReversed.length - 1;

    arg.userId = userId;
    arg.symbolId = symbolId;
    arg.data = webApiDataReversed[lastIndex];

    // error is catched by try/catch
    Transaction.create({
      price: price,
      qty: qty,
      orderType: orderType,
      userId: userId,
      symbolId: symbolId,
    });

    await portfolio.createUpdatePortfolioPosition(arg);
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

export { addTransaction, fetchWebApiQuote };
