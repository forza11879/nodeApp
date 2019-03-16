const express = require('express')
const router = express.Router()

// const helpers = require('./helpers')

const { getMain } = require('../controllers/mainController')
const { getFormApi } = require('../controllers/formController')


router.get('/', getMain)

router.get('/form', getFormApi)

// router.post('/api/:symbol', webApiController.createWebApi)
module.exports = router

