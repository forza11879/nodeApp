const express = require('express');
const router = express.Router();

const {
  getBuySellTicketParams,
  postBuySellTicketBody
} = require('../controllers/portfolio');

router.get('/buysell/:symbol/:userId', getBuySellTicketParams);
router.post('/buysell', postBuySellTicketBody);

module.exports = router;
