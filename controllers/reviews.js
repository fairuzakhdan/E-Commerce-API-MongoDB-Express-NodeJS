const Review = require('../models/Review');
const Product = require('../models/Product');

const createReview = async (req, res) => {
  const { productId } = req.params;
  const reviews = {
    rating: req.body.rating,
    message: req.body.message,
  };
  const newReviews = new Review(reviews);
  // eslint-disable-next-line no-underscore-dangle
  newReviews.author = req.user._id;
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404).json({
      status: 'fail',
      message: 'Product Not Found',
    });
    return res;
  }
  product.reviews.push(newReviews);
  await product.save();
  await newReviews.save();
  res.status(201).json({
    status: 'success',
    message: 'review added successfully',
  });
  return res;
};

const deleteReview = async (req, res) => {
  const { productId, reviewId } = req.params;
  const product = await Product.findByIdAndUpdate(productId, { $pull: { reviews: reviewId } });
  if (!product) {
    res.status(404).json({
      status: 'fail',
      message: 'Product Not Found',
    });
    return res;
  }
  await Review.findByIdAndDelete(reviewId);
  res.status(201).json({
    status: 'success',
    message: 'Review successfully deleted',
  });
  return res;
};

module.exports = { createReview, deleteReview };
