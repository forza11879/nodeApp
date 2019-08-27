const express = require('express');
const router = express.Router();

const { postLogin, postLogout } = require('../controllers/auth');

router.post('/login', postLogin);
router.post('/logout', postLogout);

module.exports = router;
