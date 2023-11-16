import { useOrders } from '../../../context/OrderContextProvider';

import { Order } from '../../../types/order.type';
import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import PointOfSaleTwoToneIcon from '@mui/icons-material/PointOfSaleTwoTone';
import { Close, Print } from '@mui/icons-material';
import { useSettings } from '../../../context/settingsContextProvider';
import { printCustomerSlip } from '../../../utils/print.utils';

type Props = {
  isOpenPaymentModal: boolean;
  setIsOpenPaymentModal: Dispatch<SetStateAction<boolean>>;
  order: { _data: Order };
};

const OrderPaymentModal = ({
  isOpenPaymentModal,
  setIsOpenPaymentModal,
  order,
}: Props) => {
  const { updateOrderStatus } = useOrders();

  const { settings } = useSettings();
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [cashPaid, setCashPaid] = useState<number>(0);

  const handlePayNow = () => {
    const chnageAmount = cashPaid - order._data.netPayable;
    updateOrderStatus(
      order._data,
      'payment done',
      paymentMethod,
      cashPaid,
      chnageAmount,
    );
  };

  return (
    <Modal
      open={isOpenPaymentModal}
      onClose={() => setIsOpenPaymentModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="rounded border-gray-300 w-11/12 sm:w-4/5 lg:w-3/4 h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4 text-center">
        <button
          className="absolute top-0 right-0 p-1 bg-gray-300 rounded"
          onClick={() => setIsOpenPaymentModal(false)}
        >
          <Close />
        </button>
        <section className="grid grid-cols-12 flex-wrap border w-full">
          <section
            className="col-span-12 sm:col-span-7 p-1 border-r"
            id="orderItems"
          >
            <div className="border-b">
              <h4 className="text-xl text-start">ORDER #: {order._data.kot}</h4>
              <div className="flex justify-between flex-wrap">
                <p>
                  Time:{' '}
                  {new Date(order._data.orderTime).toLocaleString('en-BD', {
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
            <div>
              <TableContainer>
                <Table
                  sx={{ width: '100%' }}
                  size="small"
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Sub-Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order?._data?.items.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell align="right">
                          {item.discountable && (
                            <>
                              <span className="line-through">
                                {item.price.toFixed(2)}
                              </span>{' '}
                              - {item.discount}%<br />
                            </>
                          )}
                          {item.discountedPrice.toFixed(2)}
                        </TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">
                          {(item.discountedPrice * item.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </section>
          <section className="col-span-12 sm:col-span-5 p-1">
            <TableContainer>
              <Table
                sx={{ minWidth: '100%' }}
                size="small"
                aria-label="price table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      Price Details
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Sub-total</TableCell>
                    <TableCell align="right">
                      {order?._data?.subTotal?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Discount(-{order?._data?.discount}%)</TableCell>
                    <TableCell align="right">
                      {order?._data?.discountAmount?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>VAT(+{order?._data?.vat}%)</TableCell>
                    <TableCell align="right">
                      {order?._data?.vatAmount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Net Payable</TableCell>
                    <TableCell align="right">
                      {order._data.netPayable.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cash Paid</TableCell>
                    {order._data.paymentStatus === 'payment done' ? (
                      <TableCell align="right"></TableCell>
                    ) : (
                      <TableCell align="right">
                        <TextField
                          id="cashPaid"
                          type="number"
                          color="warning"
                          focused
                          variant="outlined"
                          size="small"
                          onChange={(e) =>
                            setCashPaid(parseFloat(e.target.value) || 0)
                          }
                        />
                      </TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell>Change Amount</TableCell>
                    {order._data.paymentStatus === 'payment done' ? (
                      <TableCell align="right"></TableCell>
                    ) : (
                      <TableCell align="right">
                        {(cashPaid - order._data.netPayable).toFixed(2)}
                      </TableCell>
                    )}
                  </TableRow>
                  {order._data.paymentStatus === 'payment done' && (
                    <TableRow>
                      <TableCell>Payment Method</TableCell>
                      <TableCell align="right">
                        {order._data.paymentMethod}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {order._data.paymentStatus === 'payment due' && (
              <div className="mb-4">
                <p className="mb-2">Select Payment Methods:</p>
                <div className="flex gap-2 flex-wrap justify-center">
                  <Button
                    onClick={() => setPaymentMethod('cash')}
                    component="label"
                    variant={
                      paymentMethod === 'cash' ? 'contained' : 'outlined'
                    }
                    size="small"
                  >
                    Cash
                  </Button>
                  <Button
                    onClick={() => setPaymentMethod('mobile banking')}
                    component="label"
                    variant={
                      paymentMethod === 'mobile banking'
                        ? 'contained'
                        : 'outlined'
                    }
                    size="small"
                    color="warning"
                  >
                    Mobile Banking
                  </Button>
                  <Button
                    onClick={() => setPaymentMethod('card')}
                    component="label"
                    variant={
                      paymentMethod === 'card' ? 'contained' : 'outlined'
                    }
                    size="small"
                    color="success"
                  >
                    Card
                  </Button>
                </div>
              </div>
            )}
            {order._data.paymentStatus === 'payment due' &&
              paymentMethod &&
              cashPaid - order._data.netPayable >= 0 && (
                <Button
                  onClick={handlePayNow}
                  component="label"
                  variant="contained"
                  startIcon={<PointOfSaleTwoToneIcon />}
                  sx={{ my: 1, width: '100%' }}
                >
                  PAY NOW
                </Button>
              )}
            {order._data.paymentStatus === 'payment done' && (
              <Button
                onClick={() => printCustomerSlip(order)}
                component="label"
                variant="outlined"
                startIcon={<Print />}
                sx={{ my: 1, width: '100%' }}
              >
                Print Slip
              </Button>
            )}
          </section>
        </section>
      </Box>
    </Modal>
  );
};

export default OrderPaymentModal;
