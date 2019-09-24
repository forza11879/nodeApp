const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const {
  getPortfolioList,
  getBuySellTicket,
  postBuySellTicket,
  notFoundPage
} = require('../controllers/portfolio');

router.get('/list', isAuth, getPortfolioList);
router.get('/buysell/:symbol', isAuth, getBuySellTicket);
router.post('/buysell', postBuySellTicket);
//sub route error handling
router.get('/*', notFoundPage);

module.exports = router;
