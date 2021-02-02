import express from 'express';

import { postLogin, postLogout, postSignup } from '../controllers/auth.js';

function getAuthRoutes() {
  const router = express.Router();

  router.post('/login', postLogin);
  router.post('/logout', postLogout);
  router.post('/signup', postSignup);

  return router;
}
export { getAuthRoutes };
