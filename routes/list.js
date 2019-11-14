const express = require('express');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

const { getWebApiList, getList } = require('../controllers/list');

router.get('/add/:symbol', isAuth, getWebApiList);
router.get('/', isAuth, getList);
// router.get('/', getList);

module.exports = router;
