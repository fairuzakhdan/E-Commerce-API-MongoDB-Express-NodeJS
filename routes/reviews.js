const express = require('express');

const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const verifyToken = require('../middlewares/verifyToken');
const reviewController = require('../controllers/reviews');
const { isAuthorReview } = require('../middlewares/isAuthorization');
const { validateReview } = require('../middlewares/validator');

router.route('/:productId/reviews').post(verifyToken, validateReview, wrapAsync(reviewController.createReview));
router.route('/:productId/reviews/:reviewId').delete(verifyToken, isAuthorReview, wrapAsync(reviewController.deleteReview));

module.exports = router;
