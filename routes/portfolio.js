const express = require('express');
const router = express.Router();

const {
  getBuySellTicket,
  postBuySellTicketBody,
  notFoundPage
} = require('../controllers/portfolio');

router.get('/buysell/:symbol', getBuySellTicket);
router.post('/buysell', postBuySellTicketBody);
//sub route error handling
router.get('/*', notFoundPage);

module.exports = router;
