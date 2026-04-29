import { Container, Typography, CircularProgress, Box } from '@mui/material';
import CustomerForm from './components/CustomerForm';
import CustomerTable from './components/CustomerTable';
import { useCustomers } from './hooks/useCustomers';

function App() {
  const {
    customers,
    isLoading,
    isError,
    addCustomer,
    deleteCustomer,
    adding
  } = useCustomers();

  // 💡 Centered loading state
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  // 💡 Styled error message
  if (isError) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography color="error" variant="h6">
          Error loading customers. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Customer Dashboard
      </Typography>

      <CustomerForm onSubmit={addCustomer} loading={adding} />

      <CustomerTable customers={customers} onDelete={deleteCustomer} />
    </Container>
  );
}

export default App;
