const express = require('express')
const router = express.Router()

const { getSearchWebApi, getWebApi } = require('../controllers/stockController')
const { getWebApiList } = require('../controllers/listController')

router.get('/search/:symbol', getSearchWebApi)
router.get('/app/:symbol', getWebApi)


router.get('/list/:symbol', getWebApiList)

// router.get('/chart/:symbol', getWebApiList)

const { getDbSearchApi, getDbFetch } = require('../controllers/stockController')

router.get('/dbsearch/:symbol', getDbSearchApi)
router.get('/dbapi/:symbol', getDbFetch)





module.exports = router