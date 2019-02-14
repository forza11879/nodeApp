const express = require('express')
const router = express.Router()

const webApiController = require('../controllers/webApiController')

router.get('/search/:symbol', webApiController.getSearchWebApi)
router.get('/app/:symbol', webApiController.getWebApi)

module.exports = router