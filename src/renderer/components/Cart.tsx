import React, { KeyboardEventHandler, useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItemPod from './CartItemPod';

import { generateSequentialId } from '../utils/helper';
import { useOrders } from '../context/OrderContextProvider';

import { Order } from '../types/order.type';
import { useSettings } from '../context/settingsContextProvider';
import { Divider, IconButton, TextField } from '@mui/material';
import { Check, Edit } from '@mui/icons-material';
import OrderSuccessModal from 'renderer/features/products/components/OrderSuccessModal';

const Cart: React.FC = () => {
  const { cart, setCart, getTotalPrice } = useCart();

  const { setOrderData } = useOrders();
  const { settings } = useSettings();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newOrder, setNewOrder] = useState<Order | any>({
    items: [],
    kot: '',
    orderTime: '',
    tables: [],
    subTotal: 0,
    isOnline: false,
    paymentStatus: '',
    paymentMethod: '',
  });

  const subTotal = cart.reduce(
    (prevPrice, currentItem) =>
      prevPrice + currentItem.discountedPrice * currentItem.quantity,
    0,
  );

  const [discount, setDiscount] = useState<number>(
    settings[0]?._data?.discount,
  );

  const [discountAmount, setDiscountAmount] = useState<number>(
    (discount * subTotal) / 100,
  );

  const [vat, setVat] = useState<number>(settings[0]?._data?.vat);

  const [vatAmount, setVatAmount] = useState<number>((vat * subTotal) / 100);
  const [netPayable, setNetPayable] = useState(subTotal - discount + vat);

  useEffect(() => {
    setDiscountAmount((discount * subTotal) / 100);
    setVatAmount((vat * subTotal) / 100);
    setNetPayable(subTotal - discountAmount + vatAmount);
  }, [discount, subTotal, vat, discountAmount, vatAmount]);

  const [isEditingDiscount, setIsEditingDiscount] = useState(false);
  const [isEditingVat, setIsEditingVat] = useState(false);

  const handlePlaceOrder = async () => {
    const newOrder = {
      kot: generateSequentialId(),
      items: cart,
      subTotal,
      discount,
      discountAmount,
      vat,
      vatAmount,
      netPayable,
      cashPaid: 0,
      changeAmount: 0,

      orderTime: Date.now(),
      paymentStatus: 'payment due',
      paymentMethod: 'none',
    };

    setOrderData(newOrder);
    setNewOrder(newOrder);
    setCart([]);
    setIsOpenModal(true);
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode == 13) {
      setIsEditingDiscount(false);
      setIsEditingVat(false);
    }
  };

  return (
    <div className="mx-auto rounded-lg shadow">
      <div className="mx-auto border rounded-lg shadow-inner">
        <div className="px-4 py-6 sm:px-8 sm:py-10">
          <CartItemPod />
          {cart.length ? (
            <>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-gray-900">Sub-Total</p>
                <p className="font-semibold text-gray-900">
                  {getTotalPrice()}
                  <span className="text-xs font-normal text-gray-400"> tk</span>
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-900 flex items-center">
                  Discount(
                  {isEditingDiscount ? (
                    <TextField
                      id="discount"
                      value={discount}
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
                        setDiscount(parseInt(event.target.value) || 0);
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
                <p className="font-semibold text-gray-900">
                  - {discountAmount.toFixed(2)}
                  <span className="text-xs font-normal text-gray-400"> tk</span>
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-900 flex items-center">
                  VAT(
                  {isEditingVat ? (
                    <TextField
                      id="vat"
                      value={vat}
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
                        setVat(parseInt(event.target.value) || 0);
                      }}
                    />
                  ) : (
                    vat
                  )}
                  %)
                  {isEditingVat ? (
                    <IconButton
                      onClick={() => setIsEditingVat(false)}
                      color="success"
                      size="small"
                    >
                      <Check color="success" fontSize="inherit" />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => setIsEditingVat(true)}
                      size="small"
                    >
                      <Edit fontSize="inherit" />
                    </IconButton>
                  )}
                </p>
                <p className="font-semibold text-gray-900">
                  + {vatAmount.toFixed(2)}
                  <span className="text-xs font-normal text-gray-400"> tk</span>
                </p>
              </div>
              <Divider />
              <div className="flex items-center justify-between">
                <p className="text-gray-900">Net Payable</p>
                <p className="font-semibold text-gray-900">
                  {netPayable.toFixed(2)}
                  <span className="text-xs font-normal text-gray-400"> tk</span>
                </p>
              </div>
            </>
          ) : null}

          <div className="mt-6 text-center"></div>
        </div>
      </div>
      <OrderSuccessModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        newOrder={newOrder}
      />
    </div>
  );
};

export default Cart;
