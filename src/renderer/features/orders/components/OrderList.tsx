import { useOrders } from '../../../context/OrderContextProvider';
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
import OrderTableRow from './OrderTableRow';
import { useEffect, useState } from 'react';
import { Order } from 'renderer/types/order.type';

const OrderList = () => {
  const [orders, setOrders] = useState<Order[] | null>();
  useEffect(() => {
    const fetchOrder = async () => {
      const data = await window.electron.getAllOrder();
      setOrders(data);
    };

    fetchOrder();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  console.log(orders);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ORDER NO</StyledTableCell>
            <StyledTableCell align="right">NET AMOUNT</StyledTableCell>
            <StyledTableCell align="right">STATUS</StyledTableCell>
            <StyledTableCell align="right">ACTIONS</StyledTableCell>
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
