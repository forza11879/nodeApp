const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const {
  getBuySellTicket,
  postBuySellTicketBody,
  notFoundPage
} = require('../controllers/portfolio');

router.get('/buysell/:symbol', isAuth, getBuySellTicket);
router.post('/buysell', postBuySellTicketBody);
//sub route error handling
router.get('/*', notFoundPage);

module.exports = router;
