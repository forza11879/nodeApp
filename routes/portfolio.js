const express = require('express')
const router = express.Router()

const { getBuySellTicket } = require('../controllers/portfolio')

router.get('/buysell/:symbol', getBuySellTicket)


module.exports = router