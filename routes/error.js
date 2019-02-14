const express = require('express')
const router = express.Router()

const notFoundPageController = require('../controllers/notFound')

router.use('/', notFoundPageController.notFoundPage)

module.exports = router