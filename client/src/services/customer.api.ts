import axios from 'axios';
import type { CreateCustomerData } from '../../../types/create-customer-data.types';

const API = axios.create({
  baseURL: 'https://customer-api-jcx2.onrender.com/api/v1',
});

export const getCustomers = async () => {
  const res = await API.get('/customers');
  return res.data.data;
};

export const createCustomer = async (data: CreateCustomerData) => {
  const res = await API.post('/customers', data);
  return res.data.data;
};

export const deleteCustomer = async (id: string) => {
  await API.delete(`/customers/${id}`);
};