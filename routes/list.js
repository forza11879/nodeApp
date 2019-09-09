const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

const { getWebApiList, getList } = require('../controllers/list');

router.get('/add/:symbol', getWebApiList);
router.get('/', isAuth, getList);

module.exports = router;
