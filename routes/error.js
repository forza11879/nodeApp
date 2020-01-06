import express from 'express';
import { notFoundPage } from '../controllers/notFound.js';

const router = express.Router();

router.use('*', notFoundPage);

export default router;
