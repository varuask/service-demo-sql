const Joi = require('joi');
const ErrorResponse = require('../helpers/ErrorResponse');

exports.topUsersValidator = (req, res, next) => {
  const topUsersSchema = Joi.object({
    year: Joi.number().min(1990).max(2024).required(),
    month: Joi.number().min(1).max(12).required(),
    format: Joi.string().valid('xml', 'json', 'html'),
    transaction_id: Joi.boolean(),
    amount: Joi.boolean(),
    timestamp: Joi.boolean(),
  });

  const { error, value } = topUsersSchema.validate(req.query);
  if (error) {
    return next(new ErrorResponse(error.details[0].message, 400));
  }
  const cachingKey = `topUsers_${value.year}_${req.query.month}_${value.transaction_id}_${value.amount}_${value.timestamp}`;
  req.cacheKey = cachingKey;
  return next();
};
