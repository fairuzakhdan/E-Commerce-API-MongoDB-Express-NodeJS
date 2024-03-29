const express = require('express');

const router = express.Router();

const categoryController = require('../controllers/category');
const wrapAsync = require('../utils/wrapAsync');
const verifyToken = require('../middlewares/verifyToken');
const { validateCategory } = require('../middlewares/validator');

router.route('/')
  .get(verifyToken, wrapAsync(categoryController.getAllCategory))
  .post(verifyToken, validateCategory, wrapAsync(categoryController.createCategory));

router.route('/:categoryId')
  .get(verifyToken, wrapAsync(categoryController.getCategoryById))
  .patch(verifyToken, validateCategory, wrapAsync(categoryController.updateCategoryById))
  .delete(verifyToken, wrapAsync(categoryController.deleteCategoryById));

module.exports = router;
