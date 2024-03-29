const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15)
    .required(),
  isAdmin: Joi.boolean(),
  city: Joi.string(),
  regency: Joi.string(),
  country: Joi.string(),
  address: Joi.string().min(3),
});

module.exports = userSchema;
