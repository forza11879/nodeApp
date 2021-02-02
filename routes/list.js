import express from 'express';
import isAuth from '../middleware/is-auth.js';
// import { getWebApiList, getList } from '../controllers/list.js';
import { getWebApiList, getList } from '../controllers/user.js';
import cleanHash from '../middleware/cleanCache.js';

function getListRoutes() {
  const router = express.Router();

  router.get('/add/:symbol', isAuth, getWebApiList);
  // router.get('/add/:symbol', isAuth, cleanHash, getWebApiList);
  router.get('/', isAuth, getList);
  // router.get('/', getList);

  return router;
}
export { getListRoutes };
