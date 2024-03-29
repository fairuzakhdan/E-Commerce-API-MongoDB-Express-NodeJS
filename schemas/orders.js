const Joi = require('joi');

const orderSchema = Joi.object({
  orderItems: Joi.array().required(),
  shippingAddress: Joi.string().min(3).required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15)
    .required(),
  status: Joi.boolean(),
  totalPrice: Joi.number(),
});

module.exports = orderSchema;
