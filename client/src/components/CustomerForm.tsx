import { useState } from 'react';
import { TextField, Button, Stack, Paper, Typography } from '@mui/material';

// Added a type interface for props
interface CustomerFormProps {
  onSubmit: (data: { name: string; email: string; phone: string }) => void;
  loading: boolean;
}

const CustomerForm = ({ onSubmit, loading }: CustomerFormProps) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', email: '', phone: '' });
  };

  return (
    <Paper sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Customer
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email" // 💡 Changed type to email for basic browser validation
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Customer'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default CustomerForm;
