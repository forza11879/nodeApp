const express = require('express')
const router = express.Router()

const { getSearchWebApi, getWebApi, getDbSearchApi, getDbFetch, getChart } = require('../controllers/stock')

router.get('/websearch/:symbol', getSearchWebApi)
router.get('/dbsearch/:symbol', getDbSearchApi)
router.get('/dbapi/:symbol', getDbFetch)
router.get('/app/:symbol', getWebApi)
router.get('/chart/:symbol', getChart)

module.exports = router