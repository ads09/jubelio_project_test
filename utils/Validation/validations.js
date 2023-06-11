const Joi = require('@hapi/joi');

const productSchema = Joi.object({
  name: Joi.string().max(100).required(),
  sku: Joi.string().max(10).required(),
  image: Joi.string().max(255).optional().allow(''),
  price: Joi.number().strict().required(),
  description: Joi.string().optional().allow(''),
  stock: Joi.number().default(0)
});

const transactionSchema = Joi.object({
  sku: Joi.string().max(10).required(),
  qty: Joi.number().integer().strict().required(),
});

const pagination = Joi.object({
  page: Joi.number().min(1).required(),
  limit: Joi.number().min(1).required()
});

const skuValidation = Joi.object({
  sku: Joi.string().max(10).required(),
});

const idValidation = Joi.object({
  id: Joi.number().integer().positive().required()
});

module.exports = {
  productSchema,
  transactionSchema,
  pagination,
  skuValidation,
  idValidation
};