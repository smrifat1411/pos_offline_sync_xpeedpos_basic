import { useOrders } from '../../../context/OrderContextProvider';

import {
  Check,
  Close,
  Edit,
  PhoneOutlined,
  Print,
  VerifiedUserOutlined,
} from '@mui/icons-material';
import PointOfSaleTwoToneIcon from '@mui/icons-material/PointOfSaleTwoTone';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../../../types/order.type';
import { Form, Input } from 'antd';
import { CommonUtils } from 'renderer/utils/CommonUtils';
import { TOAST_TYPE } from 'renderer/constants/AppConstants';
import { printContent } from 'renderer/utils/print.utils';

type Props = {
  isOpenPaymentModal: boolean;
  setIsOpenPaymentModal: Dispatch<SetStateAction<boolean>>;
  order: Order;
};

const OrderPaymentModal = ({
  isOpenPaymentModal,
  setIsOpenPaymentModal,
  order: initialOrder,
}: Props) => {
  const { updateOrderStatus } = useOrders();
  const [order, setOrder] = useState<Order>(initialOrder);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [cashPaid, setCashPaid] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [isEditingDiscount, setIsEditingDiscount] = useState(false);
  const [discountedAmount, setDiscountedAmount] = useState<number>(
    (discount * initialOrder.subTotal) / 100,
  );
  const [form] = Form.useForm();
  const [customerDetails, setCustomerDetails] = useState<any | null>(null);

  const handleDiscountedAmountChange = (value: number) => {
    setDiscountedAmount(value);
    const newDiscount = (value / order.subTotal) * 100;
    setDiscount(parseFloat(newDiscount.toFixed(2)));
  };

  const handleDue = async () => {
    try {
      if (!customerDetails) {
        const values = await form.validateFields();

        const customerName = values.customerName;
        const phoneNumber = values.phoneNumber;

        const createCustomerResult = await window.electron.createCustomer({
          name: customerName,
          mobile: phoneNumber,
        });

        if (createCustomerResult.success && createCustomerResult.data.id) {
          const updatedOrder = {
            ...order,
            customerId: createCustomerResult.data.id,
          };
          await updateOrderStatus(updatedOrder);
          setOrder(updatedOrder);
          setCustomerDetails({
            name: createCustomerResult.data.name,
            mobile: createCustomerResult.data.mobile,
          });
        }
      }
    } catch (error) {}
  };

  const handlePrint = async () => {
    try {
      if (customerDetails.name !== null) {
        await window.electron.printOrPreviewComponent(
          printContent(order, customerDetails),
          true,
        );
      } else {
        CommonUtils().showToast(
          TOAST_TYPE.ERROR,
          'Please add customer details',
        );
      }
    } catch (error) {
      console.error('Error during printing:', error);
    }
  };

  const handleDiscountPercentiageChanged = (value: string) => {
    setDiscount(parseInt(value) || 0);
    const newDiscountedAmount = (parseInt(value) * order.subTotal) / 100;
    setDiscountedAmount(parseFloat(newDiscountedAmount.toFixed(0)));
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode == 13) {
      setIsEditingDiscount(false);
      // setIsEditingVat(false);
    }
  };

  const netPayable = order.subTotal - discountedAmount;

  const changeAmount = cashPaid - netPayable;

  const handlePayNow = async () => {
    try {
      // Validate the Ant Design form
      const values = await form.validateFields();

      // Collect customer name and phone number from the form
      const customerName = values.customerName;
      const phoneNumber = values.phoneNumber;

      // Invoke the createCustomer function
      const createCustomerResult = await window.electron.createCustomer({
        name: customerName,
        mobile: phoneNumber,
      });

      if (createCustomerResult.success && createCustomerResult.data.id) {
        // If customer creation is successful, update the order with the customer ID
        const updatedOrder = {
          ...order,
          customerId: createCustomerResult.data.id,
          paymentStatus: 'payment done',
          changeAmount: changeAmount,
          discountAmount: discountedAmount,
          netPayable: netPayable,
          discount: discount,
          cashPaid: cashPaid,
          paymentMethod: 'cash',
        };
        await setCustomerDetails({
          name: createCustomerResult.data.name,
          mobile: createCustomerResult.data.mobile,
        });
        await updateOrderStatus(updatedOrder);
        setOrder(updatedOrder);

        // setIsOpenPaymentModal(false);
      } else {
        CommonUtils().showToast(TOAST_TYPE.ERROR, 'Something Wrong');
      }
    } catch (error) {
      // Handle validation error (display error message, etc.)
      console.error('Form validation failed:', error);
    }
  };

  const fetchCustomerDetails = async (customerId: number) => {
    try {
      const customerResult = await window.electron.getCustomerById(customerId);
      if (customerResult.success && customerResult.data) {
        setCustomerDetails(customerResult.data);
      } else {
        console.error('Error fetching customer details:', customerResult.error);
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  // Fetch customer details when the component mounts
  useEffect(() => {
    const fetchCustomerDetails = async (customerId: number) => {
      try {
        const customerResult = await window.electron.getCustomerById(
          customerId,
        );
        if (customerResult.success && customerResult.data) {
          setCustomerDetails(customerResult.data);

          // Update the form fields with the fetched customer details
          form.setFieldsValue({
            customerName: customerResult.data.name,
            phoneNumber: customerResult.data.mobile,
          });
        } else {
          console.error(
            'Error fetching customer details:',
            customerResult.error,
          );
        }
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    if (initialOrder.customerId) {
      fetchCustomerDetails(initialOrder.customerId);
    }
  }, [initialOrder.customerId, form]);

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
          {/*Left Section  */}

          <section
            className="col-span-12 sm:col-span-7 p-1 border-r"
            id="orderItems"
          >
            <div className="border-b flex gap-3">
              <div className="flex flex-col w-[280px]">
                <h4 className="text-xl text-start">ORDER #: {order.id}</h4>

                <p className="text-left">
                  Time:{' '}
                  {new Date(order.orderTime).toLocaleString('en-BD', {
                    hour12: true,
                  })}
                </p>
              </div>
              {/* customer form */}
              <Form form={form} onFinish={() => ''} layout="vertical">
                <div className="flex gap-2">
                  <Form.Item
                    label="Customer Name"
                    name="customerName"
                    initialValue={customerDetails?.name}
                    rules={[
                      {
                        required: true,
                        message: 'Please input your customer name!',
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <VerifiedUserOutlined className="site-form-item-icon" />
                      }
                      placeholder="Customer Name"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    initialValue={customerDetails?.mobile}
                    rules={[
                      {
                        required: true,
                        message: 'Please input your phone number!',
                      },
                      {
                        pattern: /^[0-9\b]+$/,
                        message: 'Please enter only numbers.',
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined className="site-form-item-icon" />}
                      placeholder="Phone Number"
                    />
                  </Form.Item>
                </div>
              </Form>
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
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Discount</TableCell>
                      <TableCell align="right">Sub-Total</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {order?.items.map((item, index) => {
                      const discountedAmount: number =
                        item.discount !== undefined
                          ? (item.discount * item.sellingPrice) / 100
                          : 0;
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {item.name}
                          </TableCell>

                          <TableCell align="center">{item.quantity}</TableCell>
                          <TableCell align="right">
                            {
                              <>
                                <span className="">{item.sellingPrice}</span>
                              </>
                            }
                          </TableCell>
                          <TableCell align="right">
                            {item.discount !== undefined &&
                            item.discount != 0 ? (
                              <span>
                                {(item?.discount * item.sellingPrice) / 100}
                              </span>
                            ) : (
                              <span>-</span>
                            )}
                          </TableCell>
                          <TableCell align="right">
                            <span>{item.sellingPrice - discountedAmount}</span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </section>

          {/* Right Section */}
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
                    <TableCell>Total</TableCell>
                    <TableCell align="right">
                      {order?.subTotal?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <p className="text-gray-900 flex items-center">
                        Discount(
                        {isEditingDiscount ? (
                          <TextField
                            id="discount"
                            value={
                              isEditingDiscount
                                ? discount === 0
                                  ? ''
                                  : discount
                                : ''
                            }
                            type="number"
                            size="small"
                            sx={{ width: 50 }}
                            inputProps={{
                              style: {
                                padding: 0,
                              },
                              onKeyDown: handleKeyPress,
                            }}
                            margin="none"
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                              handleDiscountPercentiageChanged(
                                event.target.value,
                              );
                            }}
                          />
                        ) : (
                          discount
                        )}
                        %)
                        {isEditingDiscount ? (
                          <IconButton
                            onClick={() => setIsEditingDiscount(false)}
                            color="success"
                            size="small"
                          >
                            <Check color="success" fontSize="inherit" />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => setIsEditingDiscount(true)}
                            size="small"
                          >
                            <Edit fontSize="inherit" />
                          </IconButton>
                        )}
                      </p>
                    </TableCell>

                    <TableCell align="right">
                      {isEditingDiscount ? (
                        <TextField
                          id="discountedAmount"
                          value={
                            isEditingDiscount
                              ? discountedAmount === 0
                                ? ''
                                : discountedAmount
                              : ''
                          }
                          type="number"
                          size="small"
                          sx={{ width: 50 }}
                          inputProps={{
                            style: {
                              padding: 0,
                            },
                            onKeyDown: handleKeyPress,
                          }}
                          margin="none"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            handleDiscountedAmountChange(
                              parseFloat(event.target.value) || 0,
                            );
                          }}
                        />
                      ) : (
                        ((discount * order.subTotal) / 100).toFixed(2)
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>VAT(+{order?.vat}%)</TableCell>
                    <TableCell align="right">
                      {order.vatAmount && order?.vatAmount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Net Payable</TableCell>
                    <TableCell align="right">{netPayable}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cash Paid</TableCell>
                    {order.paymentStatus === 'payment done' ? (
                      <TableCell align="right">{order.cashPaid}</TableCell>
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
                    {order.paymentStatus === 'payment done' ? (
                      <TableCell align="right">{order.changeAmount}</TableCell>
                    ) : (
                      <TableCell align="right">
                        {Math.max(cashPaid - netPayable, 0).toFixed(2)}
                      </TableCell>
                    )}
                  </TableRow>
                  {order.paymentStatus === 'payment done' && (
                    <TableRow>
                      <TableCell>Payment Method</TableCell>
                      <TableCell align="right">{order.paymentMethod}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {order.paymentStatus === 'Pending' && (
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
            {order.paymentStatus === 'Pending' &&
              paymentMethod &&
              cashPaid - netPayable >= 0 && (
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
            {order.paymentStatus === 'Pending' && (
              <Button
                onClick={async () => {
                  try {
                    await handleDue();
                    handlePrint();
                  } catch (error) {
                    console.log(error);
                  }
                }}
                component="label"
                variant="outlined"
                startIcon={<Print />}
                sx={{ my: 1, width: '100%' }}
              >
                Print Slip without payment
              </Button>
            )}

            {order.paymentStatus === 'payment done' && (
              <Button
                onClick={() => handlePrint()}
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
