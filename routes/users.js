const express = require('express');

const router = express.Router();
const userController = require('../controllers/users');
const verifyToken = require('../middlewares/verifyToken');
const wrapAsync = require('../utils/wrapAsync');
const { validateUser } = require('../middlewares/validator');

router.route('/')
  .get(verifyToken, wrapAsync(userController.getAllUser))
  .post(verifyToken, validateUser, wrapAsync(userController.createUser));

router.route('/:userId')
  .get(verifyToken, wrapAsync(userController.getUserById))
  .patch(verifyToken, validateUser, wrapAsync(userController.updateUserById));

module.exports = router;
