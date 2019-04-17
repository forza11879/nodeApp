const db = require('../db/models/Portfolio');
const user = require('../db/models/User');

exports.getBuySellTicketParams = async (req, res) => {
  const curValue = req.params.symbol;
  const userId = req.params.userId;
  console.log('userId Params:' + typeof userId);
  console.log('userId Params:' + JSON.stringify(userId));
  const apiTokenQuote = process.env.API_TOKEN_QUOTE;
  const url = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiTokenQuote}`;

  const data = await db.fetchWebApiQuote(url);
  const userData = await user.fetchUserDataDB(userId);

  res.render('buysell', {
    data: data,
    userData: userData
  });
};

exports.postBuySellTicketBody = async (req, res) => {
  const curValue = req.body.symbol;
  const userId = req.body.userId;
  const apiTokenQuote = process.env.API_TOKEN_QUOTE;
  const url = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiTokenQuote}`;

  const data = await db.fetchWebApiQuote(url);
  const userData = await user.fetchUserDataDB(userId);

  res.render('buysell', {
    data: data,
    userData: userData
  });
};

exports.notFoundPage = (req, res) => {
  res.status(404).render('portfolio404');
};
