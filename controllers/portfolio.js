/* eslint-disable object-shorthand */
// eslint-disable-next-line no-unused-vars
import colors from 'colors';

import * as Db from '../db/models/Portfolio/index.js';
import * as UserModal from '../db/models/User/index.js';
import { User } from '../db/models/User/User.js';

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
    const portfolioList = await Db.fetchPortfolioList(userId);

    // console.log(`getPortfolioList Portfolio List: ${portfolioList}`);

    res.send(portfolioList);
  } catch (ex) {
    console.log(`getPortfolioList error${ex}`.red);
  }
};

export const getBuySellTicket = async (req, res) => {
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

    const { cash } = userData;

    const stockValue = await Db.calculateTotalValueOfStock(userId);
    console.log('stockValue: ', stockValue);

    if (Array.isArray(stockValue) && stockValue.length) {
      const valueOfStock = stockValue[0].totalValueOfStock;
      // console.log('stockValue: ', valueOfStock);
      // console.log('cash: ', cash);
      // console.log('typeof cash: ', typeof cash);

      const totalEquity = cash + valueOfStock;

      console.log('totalEquity : ', totalEquity);
      // console.log('typeof totalEquity: ', typeof totalEquity);

      userData.equity = totalEquity;

      await userData.save();
    }

    console.log('userId: ', userId);
    console.log('typeof userId: ', typeof userId);

    // const userDataUpdated = await User.findById({ _id: userId }).select(
    //   '-_id name cash equity'
    // );

    // console.log('userDataUpdated: ', userDataUpdated);
    // console.log('typeof userDataUpdated: ', typeof userDataUpdated);

    res.render('buysell', {
      data,
      userData,
      isAuthenticated: req.session.isLoggedIn, // use it when needed - example
    });
  } catch (ex) {
    console.log(`getBuySellTicketParams error${ex}`.red);
  }
};

export const postBuySellTicket = async (req, res) => {
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

export const notFoundPage = (req, res) => {
  res.status(404).render('portfolio-404');
};
