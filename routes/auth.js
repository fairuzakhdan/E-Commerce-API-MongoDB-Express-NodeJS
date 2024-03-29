const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth/auth');
const wrapAsync = require('../utils/wrapAsync');
const { validateUser } = require('../middlewares/validator');

router.post('/login', wrapAsync(authController.login));
router.get('/auth/google', authController.googleLogin);
router.get('/auth/google/callback', authController.googleCallback);
router.post('/register', validateUser, wrapAsync(authController.register));

module.exports = router;
