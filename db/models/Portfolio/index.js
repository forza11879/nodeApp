/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import { Portfolio } from './Portfolio.js';
import * as User from '../User/index.js';
import * as util from '../common/util.js';

const fetchPortfolioList = async userId => {
  try {
    // console.log(`fetchPortfolioList userId: ${userId}`);
    // console.log(`fetchPortfolioList userId: ${JSON.stringify(userId)}`);

    const query = { userId: userId };
    const portfolioList = await Portfolio.find(query).select(
      '-_id symbol data qtyPortfolio avgPrice '
    );

    // const portfolioList = await Portfolio.aggregate([
    //   { $match: { userId: userId } },
    //   {
    //     $lookup: {
    //       from: 'stocks', // collection name in db
    //       let: { symbolId: '$symbolId' },
    //       pipeline: [
    //         { $match: { $expr: { $eq: ['$_id', '$$symbolId'] } } },
    //         { $project: { data: { $slice: ['$data', 1] }, symbol: 1 } },
    //       ],
    //       as: 'symbolDb',
    //     },
    //   },
    // ]);

    return portfolioList;
  } catch (ex) {
    console.log(`fetchPortfolioList error: ${ex}`.red);
  }
};

const createUpdatePortfolioPosition = async (arg, webApiData) => {
  try {
    const { userId, symbolId, orderType, symbol } = arg;
    const webApiDataReversed = webApiData.reverse();
    const lastIndex = webApiDataReversed.length - 1;

    const data = webApiDataReversed[lastIndex];

    let qty = parseInt(arg.qty);
    const price = parseFloat(arg.price);

    if (orderType === 'Sell') qty = Math.abs(qty) * -1; // converting positive Number to Negative Number in JavaScript

    const query = { userId: userId, symbolId: symbolId };
    const position = await Portfolio.findOne(query);

    if (!position) {
      console.log('New position'.green);
      return Portfolio.create({
        qtyPortfolio: qty,
        avgPrice: price,
        userId: userId,
        symbolId: symbolId,
        symbol: symbol,
        data: data,
      });
    }

    const { qtyPortfolio, avgPrice } = position;
    const newQty = qtyPortfolio + qty;

    if (orderType === 'Buy') {
      const newAvgPrice = (avgPrice * qtyPortfolio + price * qty) / newQty;

      position.avgPrice = newAvgPrice;
    }

    console.log(`Position already exist ${orderType} order`.green);

    position.qtyPortfolio = newQty;
    position.data = data;
    await position.save();
  } catch (ex) {
    console.log(`createUpdatePortfolioPosition error: ${ex}`.red);
  }
};

const calculateTotalValueOfStock = async userId =>
  Portfolio.aggregate([
    { $match: { userId: userId } },
    {
      $group: {
        _id: userId,
        totalValueOfStock: {
          $sum: { $multiply: ['$data.close', '$qtyPortfolio'] },
        },
        // count: { $sum: 1 }
      },
    },
    { $project: { _id: 0, totalValueOfStock: 1 } },
  ]);

const getSymbolQty = async (userId, symbolId) => {
  try {
    const query = { userId: userId, symbolId: symbolId };
    const projection = { _id: 0, qtyPortfolio: 1 };
    const qtyPortfolioDb = await Portfolio.findOne(query, projection);
    return qtyPortfolioDb;
  } catch (ex) {
    console.log(`getSymbolQty error: ${ex}`.red);
  }
};

const fetchWebApiQuote = async symbol => {
  const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;
  // console.log('apiKey: ', apiKey);
  const url = `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${apiKey}`;
  // console.log('url: ', url);
  return util.fetchWebApiQuote(url);
};

const fetchUserData = async userId => User.fetchUserData(userId);

const fetchStockValue = async userId => calculateTotalValueOfStock(userId);

const fetchBuySellTicket = async (symbol, userId) => {
  try {
    // console.log('symbol: ', symbol);
    const promises = [
      fetchWebApiQuote(symbol),
      fetchUserData(userId),
      fetchStockValue(userId),
    ];

    const [data, userData, stockValue] = await Promise.all(
      promises
    ).catch(error =>
      console.log(
        `fetchBuySellTicket Error: fetchWebApiQuote, fetchUserData, fetchStockValue ${error}`
      )
    ); // Promise.all is rejected if any of the elements are rejected. Verify try/catch is at lower level otherwise if one promise is rejected the resolved one will get executed. https://www.freecodecamp.org/news/promise-all-in-javascript-with-example-6c8c5aea3e32/

    const { cash } = userData;

    let valueOfStock;

    if (!stockValue.length) {
      valueOfStock = 0;
    } else {
      valueOfStock = stockValue[0].totalValueOfStock;
    }
    //
    const totalEquity = cash + valueOfStock;
    //
    const initialInvestment = 50000;
    const gainLossCalculation = totalEquity - initialInvestment;
    //
    const gainLoss = Math.round(100 * gainLossCalculation) / 100;
    userData.equity = Math.round(100 * totalEquity) / 100;

    await userData.save();

    return {
      gainLoss,
      data,
      userData,
    };
  } catch (ex) {
    console.log(`fetchBuySellTicket error${ex}`.red);
  }
};

export {
  fetchPortfolioList,
  createUpdatePortfolioPosition,
  calculateTotalValueOfStock,
  getSymbolQty,
  fetchBuySellTicket,
};
