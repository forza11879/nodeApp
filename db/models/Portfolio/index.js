/* eslint-disable object-shorthand */
const colors = require('colors');
const axios = require('axios');
const moment = require('moment');
// model
const { Portfolio } = require('./Portfolio');
const { Stock } = require('../Stock/Stock.js');

const removeZeroPosition = async (userId, arg) => {
  try {
    const { symbol } = arg;
    const symbolId = await Stock.findOne({ symbol: symbol }, { _id: 1 });

    const query = { userId: userId, symbolId: symbolId };
    const position = await Portfolio.findOne(query);
    if (position.qtyPortfolio === 0) await Portfolio.deleteOne(query);
  } catch (err) {
    console.error(`erro from removeZeroPosition${err}`.red);
    console.log(`erro from removeZeroPosition${err}`.red);
  }
};

const fetchPortfolioList = async userId => {
  try {
    // console.log(`fetchPortfolioList userId: ${userId}`);
    // console.log(`fetchPortfolioList userId: ${JSON.stringify(userId)}`);

    const portfolioList = await Portfolio.aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          from: 'stocks', // collection name in db
          let: { symbolId: '$symbolId' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$symbolId'] } } },
            { $project: { data: { $slice: ['$data', 1] }, symbol: 1 } },
          ],
          as: 'symbolDb',
        },
      },
    ]);

    return portfolioList;
  } catch (ex) {
    console.log(`fetchPortfolioList error: ${ex}`.red);
  }
};

const fetchPortfolioPosition = async (arg, userId, symbolId) => {
  try {
    const { orderType } = arg;

    let qty = parseInt(arg.qty);
    const price = parseFloat(arg.price);

    if (orderType === 'Sell') qty = Math.abs(qty) * -1; // converting positive Number to Negative Number in JavaScript

    const query = { userId: userId, symbolId: symbolId }; // Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).
    const projection = {
      _id: 0,
      userId: 1,
      symbolId: 1,
      qtyPortfolio: 1,
      avgPrice: 1,
    }; //	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.

    const doesExistDoc = await Portfolio.findOne(query, projection);

    if (!doesExistDoc) {
      await Portfolio.create({
        qtyPortfolio: qty,
        avgPrice: price,
        userId: userId,
        symbolId: symbolId,
      });

      const queryP = { userId: userId, symbolId: symbolId }; // Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).
      const projectionP = {
        _id: 0,
        userId: 1,
        symbolId: 1,
        qtyPortfolio: 1,
        avgPrice: 1,
      }; //	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.
      console.log('New Position');

      return Portfolio.findOne(queryP, projectionP);
    }
    const { qtyPortfolio, avgPrice } = doesExistDoc;
    const newQty = qtyPortfolio + qty;

    if (orderType === 'Buy') {
      const newAvgPrice = (avgPrice * qtyPortfolio + price * qty) / newQty;

      console.log('Position already exist buy order');
      return {
        avgPrice: newAvgPrice,
        qtyPortfolio: newQty,
        userId: userId,
        symbolId: symbolId,
      };
    }

    console.log('Position already exist sell order');

    return {
      avgPrice: avgPrice,
      qtyPortfolio: newQty,
      userId: userId,
      symbolId: symbolId,
    };
  } catch (ex) {
    console.log(`fetchPortfolioPosition error: ${ex}`.red);
  }
};

const updateToPortfolio = async portfolioPosition => {
  try {
    // console.log(
    //   'updateToPortfolio Portfolio Position:' + typeof portfolioPosition
    // );
    // console.log(
    //   'updateToPortfolio Portfolio Position:' +
    //     JSON.stringify(portfolioPosition)
    // );

    const { qtyPortfolio, avgPrice, userId, symbolId } = portfolioPosition;

    const stockPortfolio = new Portfolio({
      qtyPortfolio: qtyPortfolio,
      avgPrice: avgPrice,
      userId: userId,
      symbolId: symbolId,
    });

    const query = {
      userId: stockPortfolio.userId,
      symbolId: stockPortfolio.symbolId,
    };
    const update = {
      qtyPortfolio: stockPortfolio.qtyPortfolio,
      avgPrice: stockPortfolio.avgPrice,
      userId: stockPortfolio.userId,
      symbolId: stockPortfolio.symbolId,
    };

    const options = { upsert: true, new: true }; // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    // upsert: bool - creates the object if it doesn't exist. defaults to false.

    const portfolioUpdate = await Portfolio.findOneAndUpdate(
      query,
      update,
      options
    );
    // no need to USE save() but to implement pre('save') hook on shema level we need to trigger it with the save() since it is not triggered by findOneAndUpdate() -  https://mongoosejs.com/docs/middleware.html#types-of-middleware **** Notes on findAndUpdate() and Query Middleware *** https://medium.com/@micahbales/keeping-mongodb-attributes-in-sync-can-be-tricky-but-theres-more-than-one-way-to-skin-a-cat-dcbe500d6bd1
    await portfolioUpdate.save();
  } catch (ex) {
    console.log(`updateToPortfolio error: ${ex}`.red);
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
  fetchPortfolioList,
  fetchWebApiQuote,
  updateToPortfolio,
  fetchPortfolioPosition,
  removeZeroPosition,
};
