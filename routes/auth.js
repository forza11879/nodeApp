const express = require('express');
const router = express.Router();

const { getAuth } = require('../controllers/auth');

router.get('/buysell/:symbol/:userId', getAuth);

module.exports = router;
