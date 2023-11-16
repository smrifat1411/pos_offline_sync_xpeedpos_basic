import { useOrders } from "../../../context/OrderContextProvider";
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
} from "@mui/material";
import OrderTableRow from "./OrderTableRow";

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
            <StyledTableCell align="right">NET AMOUNT</StyledTableCell>
            <StyledTableCell align="right">STATUS</StyledTableCell>
            <StyledTableCell align="right">ACTIONS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length ? orders?.map((order) => (
            <OrderTableRow order={order} key={order._data.kot} />
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderList;
