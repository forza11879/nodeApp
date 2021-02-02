import express from 'express';

import { postAddTransaction } from '../controllers/transaction.js';

function getTransactionRoutes() {
  const router = express.Router({ mergeParams: true });

  router.post('/:symbol', postAddTransaction);

  return router;
}

export { getTransactionRoutes };
