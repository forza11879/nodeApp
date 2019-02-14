const express = require('express')
const router = express.Router()

// const helpers = require('./helpers')

const webApiControler = require('../controllers/webApiControler')
const dbController = require('../controllers/dbController')
const mainController = require('../controllers/mainController')
const formApiController = require('../controllers/formController')
const notFoundPageController = require('../controllers/notFound')



router.get('/', mainController.getMain)

router.get('/form', formApiController.getFormApi)

router.get('/search/:symbol', webApiControler.getSearchWebApi)
router.get('/app/:symbol', webApiControler.getWebApi)

router.get('/dbsearch/:symbol', dbController.getDbSearchApi)
router.get('/dbapi/:symbol', dbController.getDbFetch)



// router.post('/api/:symbol', webApiController.createWebApi)

router.use('/', notFoundPageController.notFoundPage)

module.exports = router

