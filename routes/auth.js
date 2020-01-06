import express from 'express';

import { postLogin, postLogout, postSignup } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', postLogin);
router.post('/logout', postLogout);
router.post('/signup', postSignup);

export default router;
