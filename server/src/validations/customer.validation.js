const ApiError = require('../utils/ApiError');

exports.validateCreateCustomer = (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return next(new ApiError(400, 'All fields are required'));
  }

  next();
};