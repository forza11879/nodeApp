/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
// model
import { Portfolio } from './Portfolio.js';

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

    // console.log(`createUpdatePortfolioPosition data: ${typeof data}`.green);
    // console.log(
    //   `createUpdatePortfolioPosition data: ${JSON.stringify(data)}`.green
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

// const getSymbolQty = async (userId, symbolId) => {}

export {
  fetchPortfolioList,
  createUpdatePortfolioPosition,
  calculateTotalValueOfStock,
  getSymbolQty,
};
