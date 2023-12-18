import React, { useEffect, useState } from 'react';
import {
  Pagination,
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
  const { orders, currentPage, setCurrentPage } = useOrders();
  const [totalOrderCount, setTotalOrderCount] = useState();

  const getTotalOrderCount = async () => {
    const { data } = await window.electron.getTotalItemsCount('orders');

    setTotalOrderCount(data);
  };

  const ordersPerPage = 8;

  const totalPages = totalOrderCount && Math.ceil(totalOrderCount / ordersPerPage);

  useEffect(() => {
    getTotalOrderCount();
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

  const handlePageChange = (event: any, newPage: any) => {
    setCurrentPage(newPage); // Index starts from 0
  };

  return (
    <div className="flex flex-col gap-3">
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
              ? orders?.map((order, i) => (
                  <OrderTableRow order={order} key={i} />
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="w-full flex justify-end">
        <Pagination
          count={totalPages}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OrderList;
