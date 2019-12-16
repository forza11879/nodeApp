/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const axios = require('axios');
const moment = require('moment');
// model
const { Portfolio } = require('./Portfolio');
const { Stock } = require('../Stock/Stock.js');

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

const createUpdatePortfolioPosition = async arg => {
  try {
    const { userId, symbolId, orderType, symbol, data } = arg;

    // console.log(`fetchPortfolioPosition userId: ${typeof userId}`.green);
    // console.log(
    //   `fetchPortfolioPosition userId: ${JSON.stringify(userId)}`.green
    // );

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
    console.log(`fetchPortfolioPosition error: ${ex}`.red);
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

const calculateTotalValueOfStock = async userId => {
  const portfolioList = await Portfolio.aggregate([
    { $match: { userId: userId } },
    {
      $group: {
        _id: userId,
        totalAmount: { $sum: { $multiply: ['$avgPrice', '$qtyPortfolio'] } },
        // count: { $sum: 1 }
      },
    },
    // { $project: { data: { $slice: ['$data', 1] }, symbol: 1 } },
    // {
    //   $lookup: {
    //     from: 'stocks', // collection name in db
    //     let: { symbolId: '$symbolId' },
    //     pipeline: [
    //       { $match: { $expr: { $eq: ['$_id', '$$symbolId'] } } },
    //       { $project: { data: { $slice: ['$data', 1] }, symbol: 1 } },
    //     ],
    //     as: 'symbolDb',
    //   },
    // },
  ]);

  console.log('portfolioList: ', portfolioList);
};

module.exports = {
  fetchPortfolioList,
  fetchWebApiQuote,
  createUpdatePortfolioPosition,
  calculateTotalValueOfStock,
};
