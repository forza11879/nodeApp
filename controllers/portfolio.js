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
    console.log(`getPortfolioList error${ex}`);
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
    console.log(`getPortfolioList error${ex}`);
  }
};

exports.getBuySellTicket = async (req, res) => {
  try {
    // const symbol = req.params.symbol;
    const { symbol } = req.params;
    const userId = req.session.user._id;
    console.log('Authenticated User');
    console.log(`userId : ${JSON.stringify(userId)}`);
    console.log(`res.session.isLoggedIn: ${req.session.isLoggedIn}`);
    const apiTokenQuote = process.env.API_TOKEN_QUOTE;
    const url = `https://cloud.iexapis.com/beta/stock/${symbol}/quote?token=${apiTokenQuote}`;

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
    console.log(`getBuySellTicketParams error${ex}`);
  }
};

exports.postBuySellTicket = async (req, res) => {
  try {
    const curValue = req.body.symbol;
    // const userId = req.body.userId;
    const userId = req.session.user._id;
    const apiTokenQuote = process.env.API_TOKEN_QUOTE;
    const url = `https://cloud.iexapis.com/beta/stock/${curValue}/quote?token=${apiTokenQuote}`;

    const data = await Db.fetchWebApiQuote(url);
    const userData = await UserModal.fetchUserDataDB(userId);

    res.render('buysell', {
      data,
      userData,
    });
  } catch (ex) {
    console.log(`postBuySellTicketBody error${ex}`);
  }
};

exports.notFoundPage = (req, res) => {
  res.status(404).render('portfolio-404');
};
