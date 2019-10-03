const axios = require('axios');
const moment = require('moment');

const { Portfolio } = require('./Portfolio');

const fetchPortfolioList = async userId => {
  try {
    // console.log(`fetchPortfolioList userId: ${userId}`);
    // console.log(`fetchPortfolioList userId: ${JSON.stringify(userId)}`);

    const portfolioList = await Portfolio.aggregate([
      { $match: { userId: userId } },
      // {
      //   $group: {
      //     _id: { orderType: '$orderType' },
      //     totalBuyTradeAmount: { $sum: { $multiply: ['$price', '$qty'] } }
      //   }
      // },
      {
        $lookup: {
          from: 'stocks', // collection name in db
          localField: 'symbolId',
          foreignField: '_id',
          as: 'symbolDb'
        }
      }
    ]);

    const portfolioListQ = await Portfolio.aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          from: 'stocks', // collection name in db
          let: { symbolId: '$symbolId' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$symbolId'] } } },
            {
              $lookup: {
                from: 'transactions', // collection name in db
                let: { stockId: '$_id' },
                pipeline: [
                  {
                    $match: {
                      userId: userId,
                      $expr: {
                        $eq: ['$symbolId', '$$stockId']
                      }
                      // orderType: 'buy'
                    }
                  },
                  {
                    $group: {
                      _id: { orderType: '$orderType' },
                      totalBuySellTradeAmount: {
                        $sum: { $multiply: ['$price', '$qty'] }
                      }
                    }
                  }
                ],
                as: 'transactionDb'
              }
            }
          ],
          as: 'symbolDb'
        }
      }
    ]);

    console.log(
      `fetchPortfolioList Portfolio ListQ: ${JSON.stringify(portfolioListQ)}`
    );
    // console.log(`fetchPortfolioList Portfolio List: ${typeof portfolioList}`);
    // console.log(`fetchPortfolioList Portfolio List: ${portfolioList}`);
    // console.log(
    //   `fetchPortfolioList Portfolio List: ${JSON.stringify(portfolioList)}`
    // );
    return portfolioList;
  } catch (ex) {
    console.log(`fetchPortfolioList error: ${ex}`);
  }
};

const fetchQtyPortfolio = async (arg, userId, symbolId) => {
  try {
    // const orderType = arg.orderType;
    const { orderType } = arg;
    // console.log('fetchQtyPortfolio orderType:' + typeof orderType);
    // console.log('fetchQtyPortfolio orderType:' + JSON.stringify(orderType));

    let qty = parseInt(arg.qty);
    // console.log('fetchQtyPortfolio qty:' + typeof qty);
    // console.log('fetchQtyPortfolio qty:' + JSON.stringify(qty));

    // console.log('fetchQtyPortfolio userId:' + typeof userId);
    // console.log('fetchQtyPortfolio userId:' + JSON.stringify(userId));

    // console.log('fetchQtyPortfolio symbolId:' + typeof symbolId);
    // console.log('fetchQtyPortfolio symbolId:' + JSON.stringify(symbolId));

    if (orderType === 'Sell') qty = Math.abs(qty) * -1; //converting positive Number to Negative Number in JavaScript

    // console.log('fetchQtyPortfolio qty:' + typeof qty);
    // console.log('fetchQtyPortfolio qty:' + JSON.stringify(qty));

    const queryDoesExist = { userId: userId, symbolId: symbolId }; //Optional. Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}).
    const projectionDoesExist = {
      _id: 0,
      userId: 1,
      symbolId: 1,
      qtyPortfolio: 1
    }; //	Optional. Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. For details, see Projection.

    const doesExist = await Portfolio.findOne(
      queryDoesExist,
      projectionDoesExist
    );

    // console.log('fetchQtyPortfolio doesExist:' + typeof doesExist);
    // console.log('fetchQtyPortfolio doesExist:' + JSON.stringify(doesExist));

    if (!doesExist) {
      const stockPortfolio = new Portfolio({
        qtyPortfolio: qty,
        userId: userId,
        symbolId: symbolId
      });

      const query = {
        userId: stockPortfolio.userId,
        symbolId: stockPortfolio.symbolId
      };
      const update = {
        qtyPortfolio: qty,
        userId: userId,
        symbolId: symbolId
      };

      const options = { upsert: true, new: true }; // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
      // upsert: bool - creates the object if it doesn't exist. defaults to false.

      const oldQty = await Portfolio.findOneAndUpdate(
        query,
        update,
        options
      ).select('qtyPortfolio');

      // console.log('old qty:' + typeof oldQty);
      // console.log('old qty:' + JSON.stringify(oldQty));

      const { qtyPortfolio } = oldQty;
      // console.log('old qtyOne:' + JSON.stringify(qtyPortfolio));
      return qtyPortfolio;
    }

    const { qtyPortfolio } = doesExist;
    // console.log('old qtyTwo:' + JSON.stringify(qtyPortfolio));
    return (newQty = qtyPortfolio + qty);
  } catch (ex) {
    console.log(`fetchQtyPortfolio error: ${ex}`);
  }
};

const updateToPortfolio = async (qtyPortfolio, userId, symbolId) => {
  try {
    // console.log('updateToPortfolio qtyPortfolio:' + typeof qtyPortfolio);
    // console.log(
    //   'updateToPortfolio qtyPortfolio:' + JSON.stringify(qtyPortfolio)
    // );

    // console.log('updateToPortfolio userId:' + typeof userId);
    // console.log('updateToPortfolio userId:' + JSON.stringify(userId));

    // console.log('updateToPortfolio symbolId:' + typeof symbolId);
    // console.log('updateToPortfolio symbolId:' + JSON.stringify(symbolId));
    const stockPortfolio = new Portfolio({
      qtyPortfolio: qtyPortfolio,
      userId: userId,
      symbolId: symbolId
    });

    const query = {
      userId: stockPortfolio.userId,
      symbolId: stockPortfolio.symbolId
    };
    const update = {
      qtyPortfolio: stockPortfolio.qtyPortfolio,
      userId: stockPortfolio.userId,
      symbolId: stockPortfolio.symbolId
    };

    const options = { upsert: true, new: true }; // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    // upsert: bool - creates the object if it doesn't exist. defaults to false.

    const stockPortfolioResult = await Portfolio.findOneAndUpdate(
      query,
      update,
      options
    );
    // console.log(
    //   'Saved portfolio to db Portfolio',
    //   JSON.stringify(stockPortfolioResult)
    // );
  } catch (ex) {
    console.log(`addToPortfolio error: ${ex}`);
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
  fetchPortfolioList,
  fetchWebApiQuote,
  updateToPortfolio,
  fetchQtyPortfolio
};
