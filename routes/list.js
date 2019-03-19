const express = require('express')
const router = express.Router()

const { getWebApiList } = require('../controllers/list')

router.get('/add/:symbol', getWebApiList)

module.exports = router
