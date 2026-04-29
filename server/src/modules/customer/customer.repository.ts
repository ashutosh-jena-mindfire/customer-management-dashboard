import { Customer } from "../../../types/customer.types";

const customers: Customer[] = [];

export const create = (customer: Customer): Customer => {
  customers.push(customer);
  return customer;
};

export const findAll = (): Customer[] => customers;

export const remove = (id: string): boolean => {
  const index = customers.findIndex(c => c.id === id);
  if (index === -1) {
    return false;
  }

  customers.splice(index, 1);
  return true;
};
