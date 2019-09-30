const Db = require('../db/models/Transaction');
const User = require('../db/models/User');

function addTransactionOne(arg, userId) {
  return Db.addTransaction(arg, userId);
}

async function updateCashTwo(arg, userId) {
  const cash = await User.fetchCashDB(arg, userId);

  return User.updateCashDB(arg, cash, userId);
}

function dataThree(url) {
  return Db.fetchWebApiQuote(url);
}

exports.postAddTransaction = async (req, res) => {
  try {
    const { symbol } = req.body;
    const arg = req.body;
    // console.log('postAddTransaction req.body:' + typeof req.body);
    // console.log('postAddTransaction req.body:' + JSON.stringify(req.body));
    const userId = req.session.user._id;

    const apiTokenQuote = process.env.API_TOKEN_QUOTE;

    const url = `https://cloud.iexapis.com/beta/stock/${symbol}/quote?token=${apiTokenQuote}`;

    const promises = [
      addTransactionOne(arg, userId),
      updateCashTwo(arg, userId),
      dataThree(url)
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
