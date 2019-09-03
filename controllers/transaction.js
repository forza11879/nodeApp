const Db = require('../db/models/Transaction');
const User = require('../db/models/User');

exports.postAddTransaction = async (req, res) => {
  const curValue = req.body.symbol;
  const arg = req.body;
  // const User = req.user;
  const apiTokenQuote = process.env.API_TOKEN_QUOTE;

  const url = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiTokenQuote}`;

  await Db.addTransaction(arg);

  const cash = await User.fetchCashDB(arg);
  console.log('fetchCashDB:' + typeof cash);
  console.log('fetchCashDB:' + JSON.stringify(cash));

  const updatedUserData = await User.updateCashDB(arg, cash);
  console.log('updatedUserData:' + typeof updatedUserData);
  console.log('updatedUserData:' + JSON.stringify(updatedUserData));

  const data = await Db.fetchWebApiQuote(url);
  res.render('buysell', {
    data: data,
    userData: updatedUserData
  });
};
