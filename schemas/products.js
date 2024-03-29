const Joi = require('joi');

const productSchema = Joi.object({
  code: Joi.string().required(),
  name: Joi.string().required(),
  category: Joi.string(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).required(),
});
module.exports = productSchema;
