import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// 1. Defined Customer interface
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

// 2. Defined Props interface
interface CustomerTableProps {
  customers: Customer[];
  onDelete: (id: string) => void;
}

const CustomerTable = ({ customers, onDelete }: CustomerTableProps) => {
  if (!customers.length) {
    return <Typography sx={{ p: 2 }}>No customers found</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Phone</b></TableCell>
            <TableCell><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {customers.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.phone}</TableCell>
              <TableCell>
                <IconButton
                  color="error"
                  onClick={() => onDelete(c.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
