const express = require('express')
const router = express.Router()

// const webApiController = require('../controllers/webApiController')
const { getSearchWebApi, getWebApi  } = require('../controllers/webApiController')

// const webApiListController = require('../controllers/webApiListController')
const { getWebApiList } = require('../controllers/webApiListController')


// router.get('/search/:symbol', webApiController.getSearchWebApi)
// router.get('/app/:symbol', webApiController.getWebApi)
router.get('/search/:symbol', getSearchWebApi)
router.get('/app/:symbol', getWebApi)

// router.get('/list/:symbol', webApiListController.getWebApiList)
router.get('/list/:symbol', getWebApiList)

module.exports = router