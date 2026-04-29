import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCustomers,
  createCustomer,
  deleteCustomer
} from '../services/customer.api.js';

// Added Interfaces for strict safety
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface CreateCustomerData {
  name: string;
  email: string;
  phone: string;
}

export const useCustomers = () => {
  const queryClient = useQueryClient();

  // 1. GET Customers
  const {
    data: customers = [],
    isLoading,
    isError
  } = useQuery<Customer[]>({
    queryKey: ['customers'],
    queryFn: getCustomers
  });

  // 2. POST Customer
  const addMutation = useMutation({
    mutationFn: (newCustomer: CreateCustomerData) => createCustomer(newCustomer),
    onSuccess: () => {
      // ⚡ Fixed: In v5, queryKey must be inside an object
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });

  // 3. DELETE Customer
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
    onSuccess: () => {
      // ⚡ Fixed: In v5, queryKey must be inside an object
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });

  return {
    customers,
    isLoading,
    isError,
    addCustomer: addMutation.mutate,
    deleteCustomer: deleteMutation.mutate,
    adding: addMutation.isPending, // isPending replaces isLoading in v5 mutations
    deleting: deleteMutation.isPending
  };
};