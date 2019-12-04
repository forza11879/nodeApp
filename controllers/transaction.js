// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const Db = require('../db/models/Transaction');
const User = require('../db/models/User');
const Stock = require('../db/models/Stock');

async function addTransaction(arg, userId, urlCompact) {
  const webApiData = await Stock.fetchWebApiStock(urlCompact);
  // console.log('postAddTransaction webApiData: ', JSON.stringify(webApiData));

  // console.log('postAddTransaction webApiData: ', webApiData);

  const webApiDataReversed = webApiData.reverse();
  await Db.addTransaction(arg, userId, webApiDataReversed);
}

async function updateCash(arg, userId) {
  const cash = await User.fetchNewCash(arg, userId);

  return User.updateCashDB(cash, userId);
}

async function fetchData(url) {
  return Db.fetchWebApiQuote(url);
}

exports.postAddTransaction = async (req, res) => {
  try {
    const { symbol } = req.body;
    const arg = req.body;
    const userId = req.session.user._id;

    const apiKeyAlpha = process.env.API_KEY_ALPHAVANTAGE;
    // const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;

    const urlCompact = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKeyAlpha}`;

    // console.log('urlCompact: ', urlCompact.green);

    const webApiData = await Stock.fetchWebApiStock(urlCompact);
    // console.log(
    //   'postAddTransaction webApiData: ',
    //   JSON.stringify(webApiData.green)
    // );

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
