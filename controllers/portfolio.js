/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
import colors from 'colors';

import * as Portfolio from '../db/models/Portfolio/index.js';
import * as User from '../db/models/User/index.js';
// import { User } from '../db/models/User/User.js';
import * as util from '../db/models/common/util.js';

export const getPortfolio = async (req, res) => {
  try {
    res.render('portfolio', {
      isAuthenticated: req.session.isLoggedIn, // use it when needed - example
    });
  } catch (ex) {
    console.log(`getPortfolioList error${ex}`.red);
  }
};

export const getPortfolioList = async (req, res) => {
  try {
    const userId = req.session.user._id;
    // console.log(`getPortfolioList userId: ${userId}`);
    const portfolioList = await Portfolio.fetchPortfolioList(userId);

    // console.log(`getPortfolioList Portfolio List: ${portfolioList}`);

    res.send(portfolioList);
  } catch (ex) {
    console.log(`getPortfolioList error${ex}`.red);
  }
};

export const getBuySellTicket = async (req, res) => {
  try {
    const { symbol } = req.params;

    const {
      user: { _id: userId },
      isLoggedIn,
    } = req.session; // req.session.user._id

    const { gainLoss, data, userData } = await Portfolio.fetchBuySellTicket(
      symbol,
      userId
    );

    res.render('buysell', {
      gainLoss,
      data,
      userData,
      isAuthenticated: isLoggedIn, // use it when needed - example
    });
  } catch (ex) {
    console.log(`getBuySellTicket error${ex}`.red);
  }
};

export const postBuySellTicket = async (req, res) => {
  try {
    const { symbol } = req.params;
    const {
      user: { _id: userId },
    } = req.session;
    // console.log('postBuySellTicket symbol: ', symbol.red);

    const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;
    const url = `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${apiKey}`;

    // const apiTokenQuote = process.env.API_TOKEN_QUOTE;
    // const url = `https://cloud.iexapis.com/beta/stock/${symbol}/quote?token=${apiTokenQuote}`;

    const data = await util.fetchWebApiQuote(url);
    const userData = await User.fetchUserDataDB(userId);

    res.render('buysell', {
      data,
      userData,
    });
  } catch (ex) {
    console.log(`postBuySellTicket error${ex}`.red);
  }
};

export const notFoundPage = (req, res) => {
  res.status(404).render('portfolio-404');
};
