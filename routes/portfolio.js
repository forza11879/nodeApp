import express from 'express';
import isAuth from '../middleware/is-auth.js';
import {
  getPortfolio,
  getPortfolioList,
  getBuySellTicket,
  postBuySellTicket,
  notFoundPage,
} from '../controllers/portfolio.js';

function getPortfolioRoutes() {
  const router = express.Router();

  router.get('/', isAuth, getPortfolio);
  router.get('/list', isAuth, getPortfolioList);
  router.get('/buysell/:symbol', isAuth, getBuySellTicket);
  router.post('/buysell', isAuth, postBuySellTicket);
  // sub route error handling
  router.get('/*', notFoundPage);

  return router;
}
export { getPortfolioRoutes };
