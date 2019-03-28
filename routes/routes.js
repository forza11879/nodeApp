const express = require('express')
const router = express.Router()
// const helpers = require('./helpers')

const { getMain } = require('../controllers/main')
router.get('/', getMain)

module.exports = router

