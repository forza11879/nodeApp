const express = require('express');
const router = express.Router();

const {
  getBuySellTicketParams,
  postBuySellTicketBody,
  notFoundPage
} = require('../controllers/portfolio');

router.get('/buysell/:symbol/:userId', getBuySellTicketParams);
router.post('/buysell', postBuySellTicketBody);
//sub route error handling
router.get('/*', notFoundPage);

module.exports = router;
