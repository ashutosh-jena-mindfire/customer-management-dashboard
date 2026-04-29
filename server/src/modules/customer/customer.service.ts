import {create, findAll, remove} from './customer.repository';
import { v4 as uuidv4 } from 'uuid';
import ApiError from '../../utils/ApiError.js';
import { CreateCustomerData } from '../../../../types/create-customer-data.types';
import type { Customer } from '../../../../types/customer.types';

const NOT_FOUND = 404;

export const createCustomer = (data: CreateCustomerData): Customer => {
  const newCustomer: Customer = {
    id: uuidv4(),
    name: data.name,
    email: data.email,
    phone: data.phone
  };

  return create(newCustomer);
};

export const getCustomers = (): Customer[] => findAll();

export const deleteCustomer = (id: string): boolean => {

  const deleted = remove(id);

  if (!deleted) {
    throw new ApiError(NOT_FOUND, 'Customer not found');
  }

  return true;
};
