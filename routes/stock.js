const colors = require('colors');

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
router.use(
  '/app/:symbol',
  function(req, res, next) {
    console.log(`Request URL route.js: ${req.originalUrl}`.red);
    console.log(`Request Params route.js: ${req.params.symbol}`.red);

    next();
  },
  function(req, res, next) {
    console.log(`Request Type route.js: ${req.method}`.red);
    next();
  }
);
router.use(
  '/chart/:symbol',
  function(req, res, next) {
    console.log(`Request URL route.js: ${req.originalUrl}`.red);
    console.log(`Request Params route.js: ${req.params.symbol}`.red);

    next();
  },
  function(req, res, next) {
    console.log(`Request Type route.js: ${req.method}`.red);
    next();
  }
);
router.get('/app/:symbol', getWebApi);
router.get('/chart/:symbol', getChart);
router.get('/:symbol', getSymbolId);

module.exports = router;
