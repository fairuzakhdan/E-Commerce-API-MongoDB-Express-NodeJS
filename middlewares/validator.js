const ErrorHandler = require('../utils/errorHandler');
const productSchema = require('../schemas/products');
const categorySchema = require('../schemas/categories');
const userSchema = require('../schemas/users');
const orderSchema = require('../schemas/orders');
const reviewSchema = require('../schemas/reviews');

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    return next(new ErrorHandler(msg, 400));
  }
  next();
  return res;
};

const validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    return next(new ErrorHandler(msg, 400));
  }
  next();
  return res;
};

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    return next(new ErrorHandler(msg, 400));
  }
  next();
  return res;
};

const validateOrder = (req, res, next) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    return next(new ErrorHandler(msg, 400));
  }
  next();
  return res;
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    return next(new ErrorHandler(msg, 400));
  }
  next();
  return res;
};

module.exports = {
  validateProduct, validateCategory, validateUser, validateOrder, validateReview,
};
