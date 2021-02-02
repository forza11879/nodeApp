import express from 'express';

import { getAuthRoutes } from './auth.js';
import { getTransactionRoutes } from './transaction.js';
import { getPortfolioRoutes } from './portfolio.js';
import { getStockRoutes } from './stock.js';
import { getListRoutes } from './list.js';
import { getMainRoutes } from './main.js';
import { getErrorRoutes } from './error.js';

function getRoutes() {
  // All routes in our Node API are placed on this router
  const router = express.Router();

  // router.use() prefixes our route (i.e. /api/v1/auth)
  router.use('/auth', getAuthRoutes());
  router.use('/transaction', getTransactionRoutes());
  router.use('/portfolio', getPortfolioRoutes());
  router.use('/stock', getStockRoutes());
  router.use('/list', getListRoutes());
  router.use('/', getMainRoutes());
  // app.use('/', exampleRoute());
  router.use('*', getErrorRoutes());
  // app.use(errorHandler);

  return router;
}

export { getRoutes };
