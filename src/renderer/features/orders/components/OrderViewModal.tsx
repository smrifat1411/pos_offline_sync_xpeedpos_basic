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
  useState,
} from 'react';
import { ClearIndicatorProps } from 'react-select';
import { useOrders } from '../../../context/OrderContextProvider';
import { Order } from '../../../types/order.type';
import { CartItem } from '../../../types/product';

import { Select as MuiSelect, SelectChangeEvent } from '@mui/material/';
import { useProductContext } from 'renderer/context/ProductContext';

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
  // const { settings } = useSettings();
  const { allProducts } = useProductContext();

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
          <form className="flex py-2">
            <FormControl fullWidth size="small" sx={{ zIndex: 1 }}>
              <InputLabel id="new-product-select">Add New Product</InputLabel>
              <MuiSelect
                labelId="new-product-select"
                id="new-product-select"
                // value={}
                label="Add New Product"
                // onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allProducts.map((p) => (
                  <MenuItem key={p?.id} value={p?.name}>
                    {p?.name} -
                    {p?.discountable ? (
                      <>
                        <span className="line-through text-xs text-gray-400 mx-2">
                          {p?.price}
                        </span>
                        {p.discount &&
                          p?.price - (p?.price * p?.discount) / 100}
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

          <div></div>
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
          {/* { (
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
            )} */}
          {/* {order.paymentStatus === 'payment done' && (
            <Button
              // onClick={() => printCustomerSlip(order)}
              component="label"
              variant="outlined"
              startIcon={<Print />}
            >
              Print Customer Slip
            </Button>
          )} */}
        </div>
      </Box>
    </Modal>
  );
};

export default OrderViewModal;
