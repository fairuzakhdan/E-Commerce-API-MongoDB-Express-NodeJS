const Product = require('../models/Product');
const Review = require('../models/Review');

const isAuthorProduct = async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  // eslint-disable-next-line no-underscore-dangle
  if (!product.author.equals(req.user._id)) {
    res.status(401).json({
      status: 'fail',
      message: 'Not Authorized',
    });
    return res;
  }
  next();
  return res;
};

const isAuthorReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  // eslint-disable-next-line no-underscore-dangle
  if (!review.author.equals(req.user._id)) {
    res.status(401).json({
      status: 'fail',
      message: 'Not Authorized',
    });
    return res;
  }
  next();
  return res;
};

module.exports = { isAuthorProduct, isAuthorReview };
