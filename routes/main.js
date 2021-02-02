import express from 'express';
import { getMain } from '../controllers/main.js';

function getMainRoutes() {
  const router = express.Router();

  router.get('/', getMain);

  return router;
}
export { getMainRoutes };
