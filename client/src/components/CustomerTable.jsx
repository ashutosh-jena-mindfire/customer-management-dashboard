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

const CustomerTable = ({ customers, onDelete }) => {
  if (!customers.length) {
    return <Typography>No customers found</Typography>;
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