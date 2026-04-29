import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import {
  getCustomers,
  createCustomer,
  deleteCustomer
} from '../services/customer.api';
import type { Customer } from '../../../shared/types/customer.types';
import type { CustomerInput } from '../../../shared/schemas/customer.schema';

export const useCustomers = () => {
  const queryClient = useQueryClient();

  const {
    data: customers = [],
    isLoading,
    isError,
    error
  } = useQuery<Customer[]>({
    queryKey: ['customers'],
    queryFn: getCustomers
  });

  const addMutation = useMutation({
    mutationFn: (newCustomer: CustomerInput) => createCustomer(newCustomer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });

  return {
    customers,
    isLoading,
    isError,
    error,

    addCustomer: addMutation.mutateAsync,
    deleteCustomer: deleteMutation.mutateAsync,

    addStatus: addMutation,
    deleteStatus: deleteMutation
  };
};
