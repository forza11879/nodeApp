import express from 'express';
import isAuth from '../middleware/is-auth.js';
import { getWebApiList, getList } from '../controllers/list.js';

const router = express.Router();

router.get('/add/:symbol', isAuth, getWebApiList);
router.get('/', isAuth, getList);
// router.get('/', getList);

export default router;
