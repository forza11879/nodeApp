import express from 'express';
import { postAddTransaction } from '../controllers/transaction.js';

const router = express.Router({ mergeParams: true });

router.post('/:symbol', postAddTransaction);

export default router;
