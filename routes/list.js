const express = require('express')
const router = express.Router()

const { getWebApiList } = require('../controllers/listController')

router.get('/add/:symbol', getWebApiList)

module.exports = router
