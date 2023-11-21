import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from '@mui/material';
import { useOrders } from '../../../context/OrderContextProvider';
import OrderTableRow from './OrderTableRow';

const OrderList = () => {
  const { orders } = useOrders();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ORDER NO</StyledTableCell>
            <StyledTableCell align="left">NET AMOUNT</StyledTableCell>
            <StyledTableCell align="center">STATUS</StyledTableCell>
            <StyledTableCell align="center">ACTIONS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders && orders.length
            ? orders?.map((order, i) => <OrderTableRow order={order} key={i} />)
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderList;
