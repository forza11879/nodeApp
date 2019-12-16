// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const Transaction = require('../db/models/Transaction');
const User = require('../db/models/User');
const Stock = require('../db/models/Stock');

const addTransaction = async (arg, userId, urlCompact) => {
  const webApiData = await Stock.fetchWebApiStock(urlCompact);
  const webApiDataReversed = webApiData.reverse();

  await Transaction.addTransaction(arg, userId, webApiDataReversed);
};

const updateCash = async (arg, userId) => User.updateCash(arg, userId);

const fetchData = async url => Transaction.fetchWebApiQuote(url);

exports.postAddTransaction = async (req, res) => {
  try {
    const { symbol } = req.body;
    const arg = req.body;
    const userId = req.session.user._id;

    const apiKeyAlpha = process.env.API_KEY_ALPHAVANTAGE;
    // const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;

    const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKeyAlpha}`;

    // const urlCompact = `https://sandbox.iexapis.com/stable/stock/${symbol}/chart?token=${apiKey}`;

    const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;
    const url = `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${apiKey}`;

    const promises = [
      addTransaction(arg, userId, urlCompact),
      updateCash(arg, userId),
      fetchData(url),
    ];

    const [one, updatedUserDataTwoResult, dataThreeResult] = await Promise.all(
      promises
    );

    res.render('buysell', {
      data: dataThreeResult,
      userData: updatedUserDataTwoResult,
    });
  } catch (ex) {
    console.log(`postAddTransaction error${ex}`);
  }
};
