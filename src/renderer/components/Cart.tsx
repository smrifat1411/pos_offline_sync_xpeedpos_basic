import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItemPod from './CartItemPod';

import { Order } from 'renderer/types/order.type';
import { useOrders } from 'renderer/context/OrderContextProvider';
import OrderSuccessModal from 'renderer/features/products/components/OrderSuccessModal';
import { CommonUtils } from 'renderer/utils/CommonUtils';
import { TOAST_TYPE } from 'renderer/constants/AppConstants';

const Cart: React.FC = () => {
  const { cart, getTotalPrice, totalPriceWithoutDis, clearCart } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  // const { setOrderData } = useOrders();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { getAllOrdersData } = useOrders();

  const handlePlaceOrder = async () => {
    const newOrder: Order = {
      items: cart,
      orderTime: Date.now(),
      paymentStatus: 'Pending',
      subTotal: getTotalPrice(),
      discount: 0,
      discountAmount: 0,
      cashPaid: undefined,
      vat: undefined,
      vatAmount: undefined,
      netPayable: getTotalPrice(),
      changeAmount: undefined,
      paymentMethod: undefined,
      customerId: undefined,
      kot: undefined,
    };
    const { data, success, error } = await window.electron.createOrder(
      newOrder,
    );

    if (success) {
      CommonUtils().showToast(
        TOAST_TYPE.INFO,
        `An ordered is placed with amount ${newOrder.netPayable}tk`,
      );
      setOrder({ ...newOrder, id: data.id });
      getAllOrdersData();
      setIsOpenModal(true);
      clearCart();
    } else {
      CommonUtils().showToast(
        TOAST_TYPE.ERROR,
        error || `An ordered is placed with amount ${newOrder.netPayable}tk`,
      );
    }
  };

  const renderButtonOrError = () => {
    if (cart.length === 0) {
      return (
        <p className="text-red-500">
          Please add at least one product to your cart.
        </p>
      );
    } else {
      return (
        <button
          type="button"
          className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 hover:shadow-xl hover:text-slate-300"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      );
    }
  };

  return (
    <div className="mx-auto w-[100%] p-2">
      <div className="mx-auto max-w-2xl border rounded-lg overflow-hidden">
        <div className="bg-white shadow">
          <div className="px-4">
            <div className="flow-root">
              <div className="flex flex-col gap-2">
                <div className="w-full pt-2 flex gap-2 font-bold text-xl justify-between">
                  <h1>Order</h1>
                </div>
                <CartItemPod />
              </div>
            </div>
            <div className="mt-6 border-t border-b py-2"></div>

            {/* amount section */}
            <div className="w-full flex flex-col gap-2">
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-medium text-gray-900">Total</p>
                <p className="">
                  {totalPriceWithoutDis()}
                  <span className="text-xs font-normal text-gray-400"> tk</span>
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-lg font-semibold text-gray-900">Discount</p>
                <p className="text-lg font-semibold text-gray-900">
                  {totalPriceWithoutDis() - getTotalPrice()}{' '}
                  <span className="text-xs font-normal text-gray-400"> tk</span>
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-xl font-extrabold text-gray-900">Payable</p>
                <p className="text-lg font-bold text-gray-900">
                  {getTotalPrice()}{' '}
                  <span className="text-xs font-normal text-gray-400"> tk</span>
                </p>
              </div>
            </div>

            <div className="p-6 text-center">{renderButtonOrError()}</div>
          </div>
        </div>
      </div>
      {order && (
        <OrderSuccessModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          newOrder={order}
        />
      )}
    </div>
  );
};

export default Cart;
