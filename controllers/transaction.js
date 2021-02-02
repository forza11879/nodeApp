/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import { addTransaction } from '../db/models/Transaction/index.js';
import { updateCash } from '../db/models/User/index.js';
import * as Stock from '../db/models/Stock/index.js';
import {
  createUpdatePortfolioPosition,
  getSymbolQty,
} from '../db/models/Portfolio/index.js';
import { getSymbolId } from '../db/models/common/util.js';

export const postAddTransaction = async (req, res) => {
  try {
    const { symbol, orderType, qty } = req.body;
    const arg = req.body;
    const qtyStock = parseInt(qty);
    const {
      user: { _id: userId },
    } = req.session;
    //
    const symbolId = await getSymbolId(symbol);
    //
    const symbolQty = await getSymbolQty(userId, symbolId);
    //
    if (!symbolQty && orderType === 'Sell') {
      req.session.message = {
        type: 'danger',
        intro: 'Trade request failed.',
        message: 'Position not held. Try again',
      };
      return res.redirect(`/api/v1/portfolio/buysell/${symbol}`);
    }
    //
    if (symbolQty) {
      const { qtyPortfolio } = symbolQty;
      if (qtyPortfolio < qtyStock && orderType === 'Sell') {
        req.session.message = {
          type: 'danger',
          intro: 'Trade request failed.',
          message:
            'Number of shares requested to sell exceed position held. Try again',
        };
        return res.redirect(`/api/v1/portfolio/buysell/${symbol}`);
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
      return res.redirect(`/api/v1/portfolio/buysell/${symbol}`);
    }

    const promises = [
      await addTransaction(arg, symbolId, userId),
      await createUpdatePortfolioPosition(arg, webApiData),
      await updateCash(arg, userId),
    ];

    // Promise.all is rejected if any of the elements are rejected. Verify try/catch is at lower level otherwise if one promise is rejected the resolved one will get executed. - look into Promise.allSettled()
    await Promise.all(promises).catch(error =>
      console.log(
        `postAddTransaction Error: addTransaction and updateCash ${error}`
      )
    );

    req.session.message = {
      type: 'success',
      intro: 'HTTP Successfully done! ',
      message: 'Go ahead!',
    };

    res.redirect(`/api/v1/portfolio/buysell/${symbol}`);
  } catch (ex) {
    console.log(`postAddTransaction error${ex}`);
  }
};
