import { Container, Typography, CircularProgress } from '@mui/material';
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

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>Error loading customers</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Customer Dashboard
      </Typography>

      <CustomerForm onSubmit={addCustomer} loading={adding} />

      <CustomerTable customers={customers} onDelete={deleteCustomer} />
    </Container>
  );
}

export default App;