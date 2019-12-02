const express = require('express');

const router = express.Router();

const { notFoundPage } = require('../controllers/notFound');

router.use('*', notFoundPage);

module.exports = router;
