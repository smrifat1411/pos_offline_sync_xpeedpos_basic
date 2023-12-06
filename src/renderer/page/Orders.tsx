import { useEffect, useState } from 'react';
import { useOrders } from 'renderer/context/OrderContextProvider';
import OrderList from 'renderer/features/orders/components/OrderList';
import OrderSortOptions from 'renderer/features/orders/components/OrderSortOptions';

const Orders = () => {
  const [totalOrderCount, setTotalOrderCount] = useState();

  const getTotalOrderCount = async () => {
    const { data } = await window.electron.getTotalItemsCount('orders');

    setTotalOrderCount(data);
  };

  useEffect(() => {
    getTotalOrderCount();
  }, []);

  return (
    <>
      <section className="p-3">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-2xl">Total Orders: {totalOrderCount}</h2>
          <OrderSortOptions />
        </div>
        <OrderList />
      </section>
    </>
  );
};

export default Orders;
