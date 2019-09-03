const Db = require('../db/models/Portfolio');
const User = require('../db/models/User');

exports.getBuySellTicketParams = async (req, res) => {
  const curValue = req.params.symbol;
  // const User = req.user;
  console.log('Req.user: ' + JSON.stringify(req.user));
  console.log('Req.user.id: ' + JSON.stringify(req.user.id));
  console.log('User: ' + JSON.stringify(User));
  // const userId = req.params.userId;
  const userId = req.user.id;
  console.log('Params:' + JSON.stringify(req.params));
  console.log('userId Params:' + typeof userId);
  console.log('userId Params:' + JSON.stringify(userId));
  const apiTokenQuote = process.env.API_TOKEN_QUOTE;
  const url = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiTokenQuote}`;

  const data = await Db.fetchWebApiQuote(url);
  const userData = await User.fetchUserDataDB(userId);

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

  const data = await Db.fetchWebApiQuote(url);
  const userData = await User.fetchUserDataDB(userId);

  res.render('buysell', {
    data: data,
    userData: userData
  });
};

exports.notFoundPage = (req, res) => {
  res.status(404).render('portfolio-404');
};
