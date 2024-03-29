const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products');
const wrapAsync = require('../utils/wrapAsync');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../config/multer');
const { isAuthorProduct } = require('../middlewares/isAuthorization');
const { validateProduct } = require('../middlewares/validator');

router.route('/')
  .get(verifyToken, wrapAsync(productsController.getAllProduct))
  .post(verifyToken, upload.array('images', 5), validateProduct, wrapAsync(productsController.createProduct), isAuthorProduct);

router.route('/:productId')
  .get(verifyToken, wrapAsync(productsController.getProductById))
  .patch(verifyToken, isAuthorProduct, upload.array('images', 5), validateProduct, wrapAsync(productsController.updateProductById))
  .delete(verifyToken, isAuthorProduct, wrapAsync(productsController.deleteproductById));

module.exports = router;
