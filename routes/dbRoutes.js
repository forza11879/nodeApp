const express = require('express')
const router = express.Router()

const dbController = require('../controllers/dbController')

router.get('/dbsearch/:symbol', dbController.getDbSearchApi)
router.get('/dbapi/:symbol', dbController.getDbFetch)

module.exports = router