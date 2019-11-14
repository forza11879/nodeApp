const express = require('express');
const isAuth = require('../middleware/is-auth');
const {
  getPortfolio,
  getPortfolioList,
  getBuySellTicket,
  postBuySellTicket,
  notFoundPage,
} = require('../controllers/portfolio');

const router = express.Router();

router.get('/', isAuth, getPortfolio);
router.get('/list', isAuth, getPortfolioList);
router.get('/buysell/:symbol', isAuth, getBuySellTicket);
router.post('/buysell', isAuth, postBuySellTicket);
// sub route error handling
router.get('/*', notFoundPage);

module.exports = router;
