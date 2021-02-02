// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import express from 'express';
import {
  getSearchWebApi,
  getWebApi,
  getDbSearchApi,
  getDbFetch,
  getChart,
  getWebApiStock,
} from '../controllers/stock.js';

function getStockRoutes() {
  const router = express.Router();

  // Re-route into other resource routers
  router.get('/updatedb', getWebApiStock);
  // router.use('/:symbol/transaction', transactionRouter);
  router.get('/websearch/:symbol', getSearchWebApi);
  router.get('/dbsearch/:symbol', getDbSearchApi);
  router.get('/dbapi/:symbol', getDbFetch);
  router.get('/app/:symbol', getWebApi);
  router.get('/chart/:symbol', getChart);

  return router;
}
export { getStockRoutes };
