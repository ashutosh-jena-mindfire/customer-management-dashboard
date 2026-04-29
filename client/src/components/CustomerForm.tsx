import { TextField, Button, Stack, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, type CustomerInput } from '@shared/schemas/customer.schema';

// Added a type interface for props
interface CustomerFormProps {
  onSubmit: (data: CustomerInput) => Promise<boolean>;
  loading: boolean;
}

const CustomerForm = ({ onSubmit, loading }: CustomerFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const submitCustomer = async (data: CustomerInput) => {
    const didAddCustomer = await onSubmit(data);

    if (didAddCustomer) {
      reset();
    }
  };

  return (
    <Paper sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Customer
      </Typography>

      <form onSubmit={handleSubmit(submitCustomer)} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Name"
            fullWidth
            required
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            {...register('name')}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register('email')}
          />
          <TextField
            label="Phone Number"
            fullWidth
            required
            type="tel"
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
            {...register('phone')}
          />
          <Button variant="contained" type="submit" disabled={loading || !isValid}>
            {loading ? 'Adding...' : 'Add Customer'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default CustomerForm;
