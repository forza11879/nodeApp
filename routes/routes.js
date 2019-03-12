const express = require('express')
const router = express.Router()

// const helpers = require('./helpers')

// const mainController = require('../controllers/mainController')
const { getMain } = require('../controllers/mainController')
// const formApiController = require('../controllers/formController')
const { getFormApi } = require('../controllers/formController')


// router.get('/', mainController.getMain)
router.get('/', getMain)
// router.get('/form', formApiController.getFormApi)
router.get('/form', getFormApi)

// router.post('/api/:symbol', webApiController.createWebApi)



module.exports = router

