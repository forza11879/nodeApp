// eslint-disable-next-line no-unused-vars
import colors from 'colors';

import express from 'express';

import {
  getSearchWebApi,
  getWebApi,
  getDbSearchApi,
  getDbFetch,
  getChart,
  getSymbolId,
  getWebApiStock,
} from '../controllers/stock.js';

// Include other resource routers
// import transactionRouter from './transaction.js';

const router = express.Router();

// Re-route into other resource routers
router.get('/updatedb', getWebApiStock);
// router.use('/:symbol/transaction', transactionRouter);
router.get('/websearch/:symbol', getSearchWebApi);
router.get('/dbsearch/:symbol', getDbSearchApi);
router.get('/dbapi/:symbol', getDbFetch);
router.get('/app/:symbol', getWebApi);
router.get('/chart/:symbol', getChart);
router.get('/:symbol', getSymbolId);

export default router;

// // middleware
// router.use(
//   '/app/:symbol',
//   function(req, res, next) {
//     console.log(`Request URL route.js: ${req.originalUrl}`.red);
//     console.log(`Request Params route.js: ${req.params.symbol}`.red);

//     next();
//   },
//   function(req, res, next) {
//     console.log(`Request Type route.js: ${req.method}`.red);
//     next();
//   }
// );
// router.use(
//   '/chart/:symbol',
//   function(req, res, next) {
//     console.log(`Request URL route.js: ${req.originalUrl}`.red);
//     console.log(`Request Params route.js: ${req.params.symbol}`.red);

//     next();
//   },
//   function(req, res, next) {
//     console.log(`Request Type route.js: ${req.method}`.red);
//     next();
//   }
// );
