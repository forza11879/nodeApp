const Db = require('../db/models/Portfolio');
const User = require('../db/models/User');

exports.getBuySellTicket = async (req, res) => {
  try {
    if (!req.session.isLoggedIn) {
      console.log('User NOT logged in');
      return res.redirect('/');
    }
    const curValue = req.params.symbol;
    const userId = req.session.user._id;
    console.log('Authenticated User');
    console.log('userId :' + JSON.stringify(userId));
    const apiTokenQuote = process.env.API_TOKEN_QUOTE;
    const url = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiTokenQuote}`;

    const data = await Db.fetchWebApiQuote(url);
    const userData = await User.fetchUserDataDB(userId);

    res.render('buysell', {
      data: data,
      userData: userData
    });
  } catch (ex) {
    console.log(`getBuySellTicketParams error${ex}`);
  }
};

exports.postBuySellTicketBody = async (req, res) => {
  try {
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
  } catch (ex) {
    console.log(`postBuySellTicketBody error${ex}`);
  }
};

exports.notFoundPage = (req, res) => {
  res.status(404).render('portfolio-404');
};
