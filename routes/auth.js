const express = require('express');
const router = express.Router();

const { postAuth } = require('../controllers/auth');

router.post('/login', postAuth);

module.exports = router;
