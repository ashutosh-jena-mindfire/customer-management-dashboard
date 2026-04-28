import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCustomers,
  createCustomer,
  deleteCustomer
} from '../services/customer.api';

export const useCustomers = () => {
  const queryClient = useQueryClient();

  // GET
  const {
    data: customers = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers
  });

  // POST
  const addMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    }
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    }
  });

  return {
    customers,
    isLoading,
    isError,
    addCustomer: addMutation.mutate,
    deleteCustomer: deleteMutation.mutate,
    adding: addMutation.isPending,
    deleting: deleteMutation.isPending
  };
};