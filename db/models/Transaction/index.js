const axios = require('axios');
const moment = require('moment');
//services
const portfolio = require('../Portfolio');
//models
const { Transaction } = require('./Transaction');
const { Stock } = require('../Stock/Stock');

const addTransaction = async (arg, userId) => {
  try {
    const { price, qty, orderType, symbol } = arg;

    //////////////////
    // console.log('createTransaction symbol:' + typeof arg.symbol);
    // console.log('createTransaction symbol:' + JSON.stringify(arg.symbol));

    const query = { symbol: symbol }; //Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).

    const projection = { _id: 1 }; //	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.

    const symbolId = await Stock.findOne(query, projection);
    console.log('addTransaction symbolId typeof:' + typeof symbolId);
    console.log('addTransaction symbolId:' + JSON.stringify(symbolId));

    ///////////////////

    console.log('createTransaction arg:' + typeof arg);
    console.log('createTransaction arg:' + JSON.stringify(arg));

    const stockTransaction = new Transaction({
      price: price,
      qty: qty,
      orderType: orderType,
      userId: userId,
      // symbol: arg.symbol
      symbolId: symbolId
    });
    const stockTransactionResult = await stockTransaction.save();

    // console.log('createTransaction cash:' + typeof cash)
    // console.log('createTransaction cash:' + JSON.stringify(cash))

    const qtyPortfolio = await portfolio.fetchQtyPortfolio(
      arg,
      userId,
      symbolId
      // symbol
    );
    // console.log('addTransaction qtyPortfolio:' + typeof qtyPortfolio);
    // console.log('addTransaction qtyPortfolio:' + JSON.stringify(qtyPortfolio));

    //verify if you need await
    await portfolio.updateToPortfolio(qtyPortfolio, userId, symbolId);

    console.log(
      'Saved transaction to db Transaction',
      JSON.stringify(stockTransactionResult)
    );
  } catch (ex) {
    console.log(`addTransaction error: ${ex}`);
  }
};

const fetchTotalBuyTradeAmount = async (userId, symbolId) => {
  try {
    console.log(`fetchTotalBuyTradeAmount userId: ${userId}`);
    console.log(`fetchTotalBuyTradeAmount userId: ${JSON.stringify(userId)}`);

    console.log(`fetchTotalBuyTradeAmount symbolId: ${symbolId}`);
    console.log(
      `fetchTotalBuyTradeAmount symbolId: ${JSON.stringify(symbolId)}`
    );

    const totalBuyTradeValue = await Transaction.aggregate([
      { $match: { userId: userId, symbolId: symbolId, orderType: 'buy' } }
      // {
      //   $group: {
      //     _id: { orderType: 'buy' },
      //     totalBuyTradeAmount: { $sum: { $multiply: ['$price', '$qty'] } }
      //   }
      // }
    ]);

    // console.log(`fetchPortfolioList Portfolio List: ${typeof portfolioList}`);
    console.log(
      `fetchTotalBuyTradeAmount Total Buy Trade Value: ${typeof totalBuyTradeValue}`
    );
    console.log(
      `fetchTotalBuyTradeAmount Total Buy Trade Value: ${JSON.stringify(
        totalBuyTradeValue
      )}`
    );
    return totalBuyTradeValue;
  } catch (ex) {
    console.log(`fetchPortfolioList error: ${ex}`);
  }
};

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
  fetchWebApiQuote,
  fetchTotalBuyTradeAmount
};
