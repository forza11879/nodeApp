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

const fetchWebApiQuote = async symbol => {
  const apiKey = process.env.API_TOKEN_QUOTE_SANDBOX;
  const url = `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${apiKey}`;
  return util.fetchWebApiQuote(url);
};

const fetchUserData = async userId => User.fetchUserData(userId);

const fetchStockValue = async userId =>
  Portfolio.calculateTotalValueOfStock(userId);

export const getBuySellTicket = async (req, res) => {
  try {
    const { symbol } = req.params;
    const userId = req.session.user._id;

    const promises = [
      fetchWebApiQuote(symbol),
      fetchUserData(userId),
      fetchStockValue(userId),
    ];

    const [data, userData, stockValue] = await Promise.all(
      promises
    ).catch(error =>
      console.log(
        `getBuySellTicket Error: fetchWebApiQuote, fetchUserData, fetchStockValue ${error}`
      )
    ); // Promise.all is rejected if any of the elements are rejected. Verify try/catch is at lower level otherwise if one promise is rejected the resolved one will get executed. https://www.freecodecamp.org/news/promise-all-in-javascript-with-example-6c8c5aea3e32/

    const { cash } = userData;

    let valueOfStock;

    if (!stockValue.length) {
      valueOfStock = 0;
    } else {
      valueOfStock = stockValue[0].totalValueOfStock;
    }
    //
    const totalEquity = cash + valueOfStock;
    //
    const initialInvestment = 50000;
    const gainLossCalculation = totalEquity - initialInvestment;
    //
    const gainLoss = Math.round(100 * gainLossCalculation) / 100;
    userData.equity = Math.round(100 * totalEquity) / 100;

    await userData.save();

    res.render('buysell', {
      gainLoss,
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

    const data = await util.fetchWebApiQuote(url);
    const userData = await User.fetchUserDataDB(userId);

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
