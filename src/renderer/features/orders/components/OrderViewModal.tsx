import { useOrders } from '../../../context/OrderContextProvider';
import { CSSObject } from '@emotion/serialize';
import { faBangladeshiTakaSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CloseTwoTone, Print } from '@mui/icons-material';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import PrintTwoToneIcon from '@mui/icons-material/PrintTwoTone';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
} from '@mui/material';
import {
  CSSProperties,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { ClearIndicatorProps } from 'react-select';
import { useSettings } from '../../../context/settingsContextProvider';
import { Order } from '../../../types/order.type';
import { CartItem } from '../../../types/product';

import { Select as MuiSelect, SelectChangeEvent } from '@mui/material/';

type Props = {
  isOpenViewModal: boolean;
  setIsOpenViewModal: Dispatch<SetStateAction<boolean>>;
  order: Order;
};

type DropdownOption = { value: string; label: string };

const OrderViewModal = ({
  isOpenViewModal,
  setIsOpenViewModal,
  order,
}: Props) => {
  const { updateOrder, cancleOrder } = useOrders();
  // const { settings } = useSettings();

  const [products, setProducts] = useState<any[]>([]);



  const [updatedOrder, setUpdatedOrder] = useState(order);
  const [updatedItems, setUpdatedItems] = useState(order.items);



  const CustomClearText: FunctionComponent = () => <>clear all</>;
  const ClearIndicator = (props: ClearIndicatorProps<any, true>) => {
    const {
      children = <CustomClearText />,
      getStyles,
      innerProps: { ref, ...restInnerProps },
    } = props;
    return (
      <div
        {...restInnerProps}
        ref={ref}
        style={getStyles('clearIndicator', props) as CSSProperties}
      >
        <div style={{ padding: '0px 5px' }}>{children}</div>
      </div>
    );
  };

  const ClearIndicatorStyles = (
    base: CSSObject,
    state: ClearIndicatorProps<any>,
  ): CSSObject => ({
    ...base,
    cursor: 'pointer',
    color: state.isFocused ? 'blue' : 'black',
  });

  const [newProduct, setNewProduct] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setNewProduct(event.target.value);
  };

  const addToCart = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let product = products.find((p) => p?.name === newProduct);

    setUpdatedItems((prevCart: any[]) => {
      const existingItem = prevCart.find(
        (item: { name: string }) => item.name === product.name,
      );
      const discountedPrice = product.discountable
        ? product.price - (product.price * product.discount) / 100
        : product.price;
      if (existingItem) {
        return prevCart.map((item: { name: string; quantity: number }) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1, discountedPrice }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, discountedPrice }];
      }
    });

    setNewProduct('');
  };

  const removeFromCart = (productId: number) => {
    setUpdatedItems((prevCart) =>
      prevCart.filter((item) => item.id !== productId),
    );
  };

  const increaseQuantity = (productId: number) => {
    setUpdatedItems((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (productId: number) => {
    setUpdatedItems((prevCart) =>
      prevCart.map((item) => {
        return item.id === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item;
      }),
    );
  };

  const getItemTotalPrice = (item: CartItem) => {
    return item.discountedPrice * item.quantity;
  };

  const subTotal = updatedItems.reduce(
    (prev, curr) => prev + curr.discountedPrice * curr.quantity,
    0,
  );
  // const discount = (settings[0]?.discount * subTotal) / 100;
  // const vat = (settings[0]?.vat * subTotal) / 100;
  // const netPayable = subTotal - discount + vat;

  const handleOrderChanges = () => {
    let newUpdatedOrder = { ...updatedOrder, items: updatedItems };
    newUpdatedOrder.subTotal = updatedItems.reduce(
      (prev, curr) => prev + curr.discountedPrice * curr.quantity,
      0,
    );
    newUpdatedOrder.discount =
      // (settings[0]?.discount * newUpdatedOrder.subTotal) / 100;
      // newUpdatedOrder.vat = (settings[0]?.vat * newUpdatedOrder.subTotal) / 100;
      newUpdatedOrder.netPayable =
        newUpdatedOrder.subTotal -
        newUpdatedOrder.discount +
        newUpdatedOrder.vat;
    order.order_id && updateOrderById(order.order_id ,newUpdatedOrder);

    setIsOpenViewModal(false);
  };

  const handleCalcleOrder = () => {
    cancleOrder(order.kot);
  };


  const updateOrderById = async (id: string, data: Order) => {
    try {
       await window.electron.updateOrder(id, data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      open={isOpenViewModal}
      onClose={() => setIsOpenViewModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="rounded border-gray-300 w-11/12 sm:w-3/4 lg:w-2/4 h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4 text-center overflow-y-auto">
        <button
          className="absolute top-0 right-0 p-1 bg-gray-300 rounded"
          onClick={() => setIsOpenViewModal(false)}
        >
          <CloseTwoTone />
        </button>
        <h4 className="text-3xl text-green-600">Order KOT: {order.kot}</h4>
        <div className="text-start mx-auto mt-3" id="slipArea">
          <div className=" flex flex-wrap justify-evenly">
            <p className="capitalize text-gray-400 text-xs">
              Time:{' '}
              {new Date(order.orderTime).toLocaleString('en-BD', {
                hour12: true,
              })}
            </p>
            <p className="text-lg flex">
              <FontAwesomeIcon
                icon={faBangladeshiTakaSign}
                className="mr-0.5 w-3"
              />
              {/* {netPayable.toFixed(2)} */}
            </p>
            <p
              className={`capitalize text-base text-center px-2 py-1 ${
                order?.paymentStatus === 'payment due'
                  ? 'bg-amber-600'
                  : 'bg-green-600'
              } text-white rounded`}
            >
              {order?.paymentStatus}
            </p>
            <p className="capitalize text-gray-400 text-xs text-center">
              Pay With: {order?.paymentMethod}
            </p>
          </div>
          <form onSubmit={addToCart} className="flex py-2">
            <FormControl fullWidth size="small" sx={{ zIndex: 1 }}>
              <InputLabel id="new-product-select">Add New Product</InputLabel>
              <MuiSelect
                labelId="new-product-select"
                id="new-product-select"
                value={newProduct}
                label="Add New Product"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {products.map((p) => (
                  <MenuItem key={p?.id} value={p?.name}>
                    {p?.name} -
                    {p?.discountable ? (
                      <>
                        <span className="line-through text-xs text-gray-400 mx-2">
                          {p?.price}
                        </span>{' '}
                        {p?.price - (p?.price * p?.discount) / 100}
                      </>
                    ) : (
                      p?.price
                    )}
                    TK
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
            <Button variant="outlined" type="submit">
              Add
            </Button>
          </form>

          <div>
            {updatedItems?.map((item, i) => (
              <li
                key={i}
                className="flex flex-col my-4 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
              >
                <div className="relative flex gap-5 justify-between items-center">
                  <p className="text-base font-semibold text-gray-900">
                    {item.name}
                  </p>

                  <div className="flex justify-center items-center flex-wrap gap-3">
                    <div className="mt-2 flex justify-between gap-1 sm:mt-0 sm:items-center">
                      <div className="mx-auto flex h-8 items-stretch text-gray-600">
                        <button
                          className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                          onClick={() => item.id && decreaseQuantity(item.id)}
                        >
                          -
                        </button>
                        <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                          {item.quantity}
                        </div>
                        <button
                          className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                          onClick={() => item.id && increaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>

                      <div className="top-0 right-0 flex sm:bottom-0 sm:top-auto">
                        <button
                          type="button"
                          className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900 bg-red-300"
                          onClick={() => item.id && removeFromCart(item.id)}
                        >
                          <svg
                            className="h-5 w-5"
                            xmlns="https://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                              className=""
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="shrink-0 text-base font-semibold text-gray-900 sm:text-right">
                      {item.discountable && (
                        <>
                          <span className="line-through">{item.price}</span> -{' '}
                          {item.discount}% =
                        </>
                      )}{' '}
                      {/* {item.discountedPrice.toFixed(2)} X {item.quantity} ={" "} */}
                      {/* {getItemTotalPrice(item).toFixed(2)} */}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center flex-wrap gap-2 mt-2">
          <Button
            // onClick={() => printChefSlip(order)}
            component="label"
            variant="outlined"
            color="success"
            startIcon={<PrintTwoToneIcon />}
          >
            Print Slip for Chef
          </Button>
          { (
              <>
                <Button
                  onClick={handleCalcleOrder}
                  component="label"
                  variant="contained"
                  color="warning"
                  startIcon={<CancelTwoToneIcon />}
                >
                  Cancel Order
                </Button>
                <Button
                  onClick={handleOrderChanges}
                  component="label"
                  variant="contained"
                  color="info"
                  startIcon={<SaveAsTwoToneIcon />}
                >
                  Save Changes
                </Button>
              </>
            )}
          {order.paymentStatus === 'payment done' && (
            <Button
              // onClick={() => printCustomerSlip(order)}
              component="label"
              variant="outlined"
              startIcon={<Print />}
            >
              Print Customer Slip
            </Button>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default OrderViewModal;
