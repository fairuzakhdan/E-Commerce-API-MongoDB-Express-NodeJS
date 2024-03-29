const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().min(5),
  status: Joi.boolean(),
});

module.exports = categorySchema;
