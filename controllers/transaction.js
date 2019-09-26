const Db = require('../db/models/Transaction');
const User = require('../db/models/User');

exports.postAddTransaction = async (req, res) => {
  try {
    const { symbol } = req.body;
    const arg = req.body;
    // console.log('postAddTransaction req.body:' + typeof req.body);
    // console.log('postAddTransaction req.body:' + JSON.stringify(req.body));
    const userId = req.session.user._id;

    const apiTokenQuote = process.env.API_TOKEN_QUOTE;

    const url = `https://cloud.iexapis.com/beta/stock/${symbol}/quote?token=${apiTokenQuote}`;

    await Db.addTransaction(arg, userId);

    const cash = await User.fetchCashDB(arg, userId);
    // console.log('fetchCashDB:' + typeof cash);
    // console.log('fetchCashDB:' + JSON.stringify(cash));

    const updatedUserData = await User.updateCashDB(arg, cash, userId);
    // console.log('updatedUserData:' + typeof updatedUserData);
    // console.log('updatedUserData:' + JSON.stringify(updatedUserData));

    const data = await Db.fetchWebApiQuote(url);
    res.render('buysell', {
      data: data,
      userData: updatedUserData
    });
  } catch (ex) {
    console.log(`postAddTransaction error${ex}`);
  }
};
