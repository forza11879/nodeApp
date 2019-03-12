const express = require('express')
const router = express.Router()

// const dbController = require('../controllers/dbController')
const { getDbSearchApi, getDbFetch } = require('../controllers/dbController')

// router.get('/dbsearch/:symbol', dbController.getDbSearchApi)
// router.get('/dbapi/:symbol', dbController.getDbFetch)
router.get('/dbsearch/:symbol', getDbSearchApi)
router.get('/dbapi/:symbol', getDbFetch)


module.exports = router