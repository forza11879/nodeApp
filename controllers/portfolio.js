// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const Db = require('../db/models/Portfolio');
const UserModal = require('../db/models/User');
const { User } = require('../db/models/User/User');
// const Transaction = require('../db/models/Transaction');

exports.getPortfolio = async (req, res) => {
  try {
    res.render('portfolio', {
      isAuthenticated: req.session.isLoggedIn, // use it when needed - example
    });
  } catch (ex) {
    console.log(`getPortfolioList error${ex}`.red);
  }
};

exports.getPortfolioList = async (req, res) => {
  try {
    const userId = req.session.user._id;
    // console.log(`getPortfolioList userId: ${userId}`);
    const portfolioList = await Db.fetchPortfolioList(userId);

    // console.log(`getPortfolioList Portfolio List: ${portfolioList}`);

    res.send(portfolioList);
  } catch (ex) {
    console.log(`getPortfolioList error${ex}`.red);
  }
};

exports.getBuySellTicket = async (req, res) => {
  try {
    const { symbol } = req.params;
    const userId = req.session.user._id;

    console.log('Authenticated User'.green);
    console.log(`userId : ${JSON.stringify(userId)}`.green);

    console.log(`res.session.isLoggedIn: ${req.session.isLoggedIn}`);

    const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;
    const url = `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${apiKey}`;

    const data = await Db.fetchWebApiQuote(url);
    const userData = await User.findById({ _id: userId }).select(
      '_id name cash equity'
    );

    res.render('buysell', {
      data,
      userData,
      isAuthenticated: req.session.isLoggedIn, // use it when needed - example
    });
  } catch (ex) {
    console.log(`getBuySellTicketParams error${ex}`.red);
  }
};

exports.postBuySellTicket = async (req, res) => {
  try {
    const { symbol } = req.params;
    const userId = req.session.user._id;
    console.log('postBuySellTicket symbol: ', symbol.red);

    const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;
    const url = `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${apiKey}`;

    // const apiTokenQuote = process.env.API_TOKEN_QUOTE;
    // const url = `https://cloud.iexapis.com/beta/stock/${symbol}/quote?token=${apiTokenQuote}`;

    const data = await Db.fetchWebApiQuote(url);
    const userData = await UserModal.fetchUserDataDB(userId);

    res.render('buysell', {
      data,
      userData,
    });
  } catch (ex) {
    console.log(`postBuySellTicketBody error${ex}`.red);
  }
};

exports.notFoundPage = (req, res) => {
  res.status(404).render('portfolio-404');
};
