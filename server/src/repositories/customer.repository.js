let customers = [];

const create = (customer) => {
  customers.push(customer);
  return customer;
};

const findAll = () => customers;

const remove = (id) => {
  const index = customers.findIndex(c => c.id === id);
  if (index === -1) return false;

  customers.splice(index, 1);
  return true;
};

module.exports = {
  create,
  findAll,
  remove
};