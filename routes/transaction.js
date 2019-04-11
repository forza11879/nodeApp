const express = require('express')
const router = express.Router()

const { postAddTransaction } = require('../controllers/transaction')

router.post('/add', postAddTransaction)


module.exports = router