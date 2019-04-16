const db = require('../db/models/Portfolio');
const user = require('../db/models/User');

exports.getBuySellTicketParams = async (req, res) => {
  const curValue = req.params.symbol;
  const apiTokenQuote = process.env.API_TOKEN_QUOTE;
  const url = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiTokenQuote}`;

  const data = await db.fetchWebApiQuote(url);

  res.render('buysell', {
    data: data
  });
};

exports.postBuySellTicketBody = async (req, res) => {
  const curValue = req.body.symbol;
  const userId = req.body.userId;
  const arg = req.body;
  console.log('Current value :' + typeof userId);
  console.log('Current value :' + JSON.stringify(userId));
  const apiTokenQuote = process.env.API_TOKEN_QUOTE;
  const url = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiTokenQuote}`;

  const data = await db.fetchWebApiQuote(url);
  const userData = await user.fetchUserDataDB(arg);
  console.log('Current value :' + typeof userData);
  console.log('Current value :' + JSON.stringify(userData));

  res.render('buysell', {
    data: data,
    userData: userData
  });
};
