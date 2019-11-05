const Db = require('../db/models/Transaction');
const User = require('../db/models/User');
const { Stock } = require('../db/models/Stock/Stock');

function addTransaction(arg, userId, next) {
  return Db.addTransaction(arg, userId, next);
}

async function updateCash(arg, userId) {
  const cash = await User.fetchCashDB(arg, userId);

  return User.updateCashDB(arg, cash, userId);
}

function fetchData(url) {
  return Db.fetchWebApiQuote(url);
}

exports.postAddTransaction = async (req, res, next) => {
  try {
    const { symbol } = req.body;
    const arg = req.body;
    // console.log('postAddTransaction req.body:' + typeof req.body);
    // console.log('postAddTransaction req.body:' + JSON.stringify(req.body));
    const userId = req.session.user._id;

    const apiTokenQuote = process.env.API_TOKEN_QUOTE;

    const url = `https://cloud.iexapis.com/beta/stock/${symbol}/quote?token=${apiTokenQuote}`;

    const promises = [
      addTransaction(arg, userId, next),
      updateCash(arg, userId),
      fetchData(url)
    ];

    const [one, updatedUserDataTwoResult, dataThreeResult] = await Promise.all(
      promises
    );

    res.render('buysell', {
      data: dataThreeResult,
      userData: updatedUserDataTwoResult
    });
  } catch (ex) {
    console.log(`postAddTransaction error${ex}`);
  }
};
