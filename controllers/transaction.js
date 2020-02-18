/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import * as Transaction from '../db/models/Transaction/index.js';
import * as User from '../db/models/User/index.js';
import * as Stock from '../db/models/Stock/index.js';
import { Portfolio as PortfolioModel } from '../db/models/Portfolio/Portfolio.js';
import { Stock as StockModel } from '../db/models/Stock/Stock.js';

const addTransaction = async (arg, userId, webApiData) => {
  const webApiDataReversed = webApiData.reverse();

  await Transaction.addTransaction(arg, userId, webApiDataReversed);
};

const updateCash = async (arg, userId) => User.updateCash(arg, userId);

export const postAddTransaction = async (req, res) => {
  try {
    const { symbol } = req.body;
    const arg = req.body;
    const { orderType } = arg;
    const qty = parseInt(arg.qty);
    const userId = req.session.user._id;
    //
    const querySymbol = { symbol };
    const projectionSymbol = { _id: 1 };
    const symbolId = await StockModel.findOne(querySymbol, projectionSymbol);
    //
    const query = { userId: userId, symbolId: symbolId };
    const projection = { _id: 0, qtyPortfolio: 1 };
    const qtyPortfolioDb = await PortfolioModel.findOne(query, projection);

    if (qtyPortfolioDb) {
      const { qtyPortfolio } = qtyPortfolioDb;
      if (qtyPortfolio < qty && orderType === 'Sell') {
        req.session.message = {
          type: 'danger',
          intro: 'Trade request failed.',
          message:
            'Number of shares requested to sell exceed position held. Try again',
        };
        return res.redirect(`/portfolio/buysell/${symbol}`);
      }
    }

    const apiKeyAlpha = process.env.API_KEY_ALPHAVANTAGE;
    // const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;

    const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKeyAlpha}`;

    // const urlCompact = `https://sandbox.iexapis.com/stable/stock/${symbol}/chart?token=${apiKey}`;

    const webApiData = await Stock.fetchWebApiStock(urlCompact);

    if (!webApiData) {
      req.session.message = {
        type: 'danger',
        intro: 'HTTP request failed! ',
        message: 'Try again',
      };
      return res.redirect(`/portfolio/buysell/${symbol}`);
    }

    const promises = [
      addTransaction(arg, userId, webApiData),
      updateCash(arg, userId),
    ];

    await Promise.all(promises);

    req.session.message = {
      type: 'success',
      intro: 'HTTP Successfully done! ',
      message: 'Go ahead!',
    };

    res.redirect(`/portfolio/buysell/${symbol}`);
  } catch (ex) {
    console.log(`postAddTransaction error${ex}`);
  }
};
