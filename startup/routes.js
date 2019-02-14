const express = require('express')
const router = express.Router()

// const helpers = require('./helpers')
const webApiController = require('../controllers/webApiController')
const mainController = require('../controllers/mainController')
const dbFetchController = require('../controllers/dbFetchController')
const formController = require('../controllers/formController')
const searchWebApiController = require('../controllers/searchWebApiController')
const dbSearchController = require('../controllers/dbSearchController')
const notFound = require('../controllers/notFound')


router.get('/', mainController.getMain)

router.get('/form', formController.getFormApi)
router.get('/search/:symbol', searchWebApiController.getSearchWebApi)
router.get('/dbsearch/:symbol', dbSearchController.getDbSearchApi)
router.get('/app/:symbol', webApiController.getWebApi)
router.get('/dbapi/:symbol', dbFetchController.getDbFetch)
// router.post('/api/:symbol', webApiController.createWebApi)

router.use('/', notFound.notFoundPage)

module.exports = router

