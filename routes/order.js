const express = require('express');

const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const orderController = require('../controllers/order');
const verifyToken = require('../middlewares/verifyToken');
const { validateOrder } = require('../middlewares/validator');

router.route('/')
  .get(verifyToken, wrapAsync(orderController.getAllOrder))
  .post(verifyToken, validateOrder, wrapAsync(orderController.createOrder));

router.route('/:orderId')
  .get(verifyToken, wrapAsync(orderController.getOrderById))
  .put(verifyToken, validateOrder, wrapAsync(orderController.updateOrderById))
  .delete(verifyToken, wrapAsync(orderController.deleteOrderById));

module.exports = router;
