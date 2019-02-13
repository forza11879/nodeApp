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


router.get('/', mainController.main)

router.get('/form', formController.formApi)
router.get('/search/:symbol', searchWebApiController.searchWebApi)
router.get('/dbsearch/:symbol', dbSearchController.dbSearchApi)
router.get('/app/:symbol', webApiController.webApi)
router.get('/dbapi/:symbol', dbFetchController.dbFetch)
// router.post('/api/:symbol', webApiController.createWebApi)

router.use('/', notFound.notFoundPage)

module.exports = router

