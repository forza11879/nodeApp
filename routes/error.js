import express from 'express';
import { notFoundPage } from '../controllers/notFound.js';

function getErrorRoutes() {
  const router = express.Router();

  router.use('*', notFoundPage);

  return router;
}
export { getErrorRoutes };
