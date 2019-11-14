const express = require('express');

const router = express.Router({ mergeParams: true });

const { postAddTransaction } = require('../controllers/transaction');

router.post('/', postAddTransaction);

module.exports = router;
