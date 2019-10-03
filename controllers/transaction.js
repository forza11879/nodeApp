const Db = require('../db/models/Transaction');
const User = require('../db/models/User');
const { Stock } = require('../db/models/Stock/Stock');

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

    /////////////

    const query = { symbol: symbol };
    const projection = { _id: 1 };
    // const symbolId = await Stock.findOne(query, projection);
    const { _id } = await Stock.findOne(query, projection);
    console.log('addTransaction userId typeof:' + typeof userId);
    console.log('addTransaction userId:' + JSON.stringify(userId));
    // console.log('addTransaction symbolId typeof:' + typeof symbolId);
    // console.log('addTransaction symbolId:' + JSON.stringify(symbolId));
    console.log('addTransaction _id:' + JSON.stringify(_id));

    const TotalBuyTradeAmount = Db.fetchTotalBuyTradeAmount(userId, _id);
    // console.log(
    //   'addTransaction TotalBuyTradeAmount typeof:' + typeof TotalBuyTradeAmount
    // );
    // console.log(
    //   'addTransaction TotalBuyTradeAmount:' +
    //     JSON.stringify(TotalBuyTradeAmount)
    // );

    res.render('buysell', {
      data: dataThreeResult,
      userData: updatedUserDataTwoResult
    });
  } catch (ex) {
    console.log(`postAddTransaction error${ex}`);
  }
};
