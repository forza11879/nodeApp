import express from 'express';
import { postAddTransaction } from '../controllers/transaction.js';

const router = express.Router({ mergeParams: true });

router.post('/', postAddTransaction);

export default router;
