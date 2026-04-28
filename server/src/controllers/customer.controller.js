const service = require('../services/customer.service');
const response = require('../utils/response');

exports.createCustomer = (req, res, next) => {
  try {
    const data = service.createCustomer(req.body);
    response.success(res, data, 'Customer created');
  } catch (err) {
    next(err);
  }
};

exports.getCustomers = (req, res, next) => {
  try {
    const data = service.getCustomers();
    response.success(res, data);
  } catch (err) {
    next(err);
  }
};

exports.deleteCustomer = (req, res, next) => {
  try {
    service.deleteCustomer(req.params.id);
    response.success(res, null, 'Customer deleted');
  } catch (err) {
    next(err);
  }
};