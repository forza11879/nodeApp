const express = require('express');

const {
  getSearchWebApi,
  getWebApi,
  getDbSearchApi,
  getDbFetch,
  getChart,
  getSymbolId,
} = require('../controllers/stock');

// Include other resource routers
const transactionRouter = require('./transaction');

const router = express.Router();

// Re-route into other resource routers
router.use('/:symbol/transaction', transactionRouter);

router.get('/websearch/:symbol', getSearchWebApi);
router.get('/dbsearch/:symbol', getDbSearchApi);
router.get('/dbapi/:symbol', getDbFetch);
router.get('/app/:symbol', getWebApi);
router.get('/chart/:symbol', getChart);
router.get('/:symbol', getSymbolId);

module.exports = router;
