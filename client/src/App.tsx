import { useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Snackbar,
  Typography
} from '@mui/material';
import type { AlertColor } from '@mui/material';

import CustomerForm from './components/CustomerForm';
import CustomerTable from './components/CustomerTable';
import { useCustomers } from './hooks/useCustomers';
import type { CustomerInput } from '../../shared/schemas/customer.schema';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

const getErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (error as { response?: { data?: { message?: unknown } } }).response;

    if (typeof response?.data?.message === 'string') {
      return response.data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};

function App() {
  const {
    customers,
    isLoading,
    isError,
    addCustomer,
    deleteCustomer,
    addStatus,
    deleteStatus
  } = useCustomers();

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleAdd = async (data: CustomerInput): Promise<boolean> => {
    try {
      await addCustomer(data);
      setSnackbar({
        open: true,
        message: 'Customer added successfully!',
        severity: 'success'
      });
      return true;
    } catch (error) {
      setSnackbar({
        open: true,
        message: getErrorMessage(error, 'Failed to add customer'),
        severity: 'error'
      });
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomer(id);
      setSnackbar({
        open: true,
        message: 'Customer deleted successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: getErrorMessage(error, 'Failed to delete customer'),
        severity: 'error'
      });
    }
  };

  const closeSnackbar = () => {
    setSnackbar(currentSnackbar => {
      return {
        ...currentSnackbar,
        open: false
      };
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Customer Dashboard
      </Typography>

      {/* ✅ Form (disable while adding) */}
      <CustomerForm
        onSubmit={handleAdd}
        loading={addStatus.isPending}
      />

      {/* ✅ Initial loading */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="error" variant="h6">
          Error loading customers. Please try again later.
        </Typography>
      ) : (
        <CustomerTable
          customers={customers}
          onDelete={handleDelete}
          deleting={deleteStatus.isPending}
        />
      )}

      {/* ✅ Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert severity={snackbar.severity} variant="filled" onClose={closeSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
