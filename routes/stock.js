const express = require('express')
const router = express.Router()

const { getSearchWebApi, getWebApi, getDbSearchApi, getDbFetch } = require('../controllers/stockController')
const { getWebApiList } = require('../controllers/listController')

router.get('/websearch/:symbol', getSearchWebApi)
router.get('/dbsearch/:symbol', getDbSearchApi)
router.get('/dbapi/:symbol', getDbFetch)
router.get('/app/:symbol', getWebApi)

router.get('/list/:symbol', getWebApiList)


module.exports = router