const express = require('express')
const router = express.Router()

// const notFoundPageController = require('../controllers/notFound')
const { notFoundPage } = require('../controllers/notFound')

// router.use('/', notFoundPageController.notFoundPage)
router.use('/', notFoundPage)

module.exports = router