import express from 'express';
import { getMain } from '../controllers/main.js';

const router = express.Router();

router.get('/', getMain);

export default router;
