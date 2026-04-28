const repo = require('../repositories/customer.repository');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/ApiError');

const createCustomer = (data) => {
  const newCustomer = {
    id: uuidv4(),
    name: data.name,
    email: data.email,
    phone: data.phone
  };

  return repo.create(newCustomer);
};

const getCustomers = () => {
  return repo.findAll();
};

const deleteCustomer = (id) => {
  const deleted = repo.remove(id);

  if (!deleted) {
    throw new ApiError(404, 'Customer not found');
  }

  return true;
};

module.exports = {
  createCustomer,
  getCustomers,
  deleteCustomer
};