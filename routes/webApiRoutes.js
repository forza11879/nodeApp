const express = require('express')
const router = express.Router()

const webApiController = require('../controllers/webApiController')
const webApiListController = require('../controllers/webApiListController')

router.get('/search/:symbol', webApiController.getSearchWebApi)
router.get('/app/:symbol', webApiController.getWebApi)
router.get('/list/:symbol', webApiListController.getWebApiList)

module.exports = router