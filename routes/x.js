const express = require('express');

const { getWebApi } = require('../controllers/stock');

const router = express.Router();

router.get('/:symbol', getWebApi);

module.exports = router;
