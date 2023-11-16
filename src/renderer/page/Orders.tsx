import { useOrders } from "renderer/context/OrderContextProvider";
import OrderList from "renderer/features/orders/components/OrderList";
import OrderSortOptions from "renderer/features/orders/components/OrderSortOptions";

const Orders = () => {
  const { orders } = useOrders();

  return (
    <>

      <section className="p-3">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-2xl">Total Orders: {orders.length}</h2>
          <OrderSortOptions />
        </div>
        <OrderList />
      </section>
    </>
  );
};

export default Orders;
