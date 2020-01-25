// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import * as Transaction from '../db/models/Transaction/index.js';
import * as User from '../db/models/User/index.js';
import * as Stock from '../db/models/Stock/index.js';
import * as util from '../db/models/common/util.js';

const addTransaction = async (arg, userId, webApiData) => {
  const webApiDataReversed = webApiData.reverse();

  await Transaction.addTransaction(arg, userId, webApiDataReversed);
};

const updateCash = async (arg, userId) => User.updateCash(arg, userId);

export const postAddTransaction = async (req, res) => {
  try {
    const { symbol } = req.body;
    const arg = req.body;
    const userId = req.session.user._id;

    console.log('postAddTransaction req.body: ', arg);

    const apiKeyAlpha = process.env.API_KEY_ALPHAVANTAGE;
    // const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;

    const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKeyAlpha}`;

    // const urlCompact = `https://sandbox.iexapis.com/stable/stock/${symbol}/chart?token=${apiKey}`;

    const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;
    const url = `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${apiKey}`;

    const dataThreeResult = await util.fetchWebApiQuote(url);
    if (!dataThreeResult) {
      req.flash('error', 'connection error');
      return;
    }

    const webApiData = await Stock.fetchWebApiStock(urlCompact);
    if (!webApiData) {
      req.flash('error', 'connection error');
      return;
    }

    const promises = [
      addTransaction(arg, userId, webApiData),
      updateCash(arg, userId),
    ];

    const [one, updatedUserDataTwoResult] = await Promise.all(promises);

    res.render('buysell', {
      data: dataThreeResult,
      userData: updatedUserDataTwoResult,
    });
  } catch (ex) {
    console.log(`postAddTransaction error${ex}`);
  }
};
