const Joi = require('joi');

const reviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  message: Joi.string().min(3).required(),
});

module.exports = reviewSchema;
