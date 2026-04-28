import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1'
});

export const getCustomers = async () => {
  const res = await API.get('/customers');
  return res.data.data;
};

export const createCustomer = async (data) => {
  const res = await API.post('/customers', data);
  return res.data.data;
};

export const deleteCustomer = async (id) => {
  await API.delete(`/customers/${id}`);
};