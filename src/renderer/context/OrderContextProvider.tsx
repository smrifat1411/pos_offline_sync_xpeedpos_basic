import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Order } from '../types/order.type';

interface OrderContextType {
  orders: (Order | any)[];
  setOrderData: (data: Order | any) => void;
  setSortField: Dispatch<SetStateAction<string>>;
  setSortOrder: Dispatch<SetStateAction<'desc' | 'asc'>>;
  sortField: string;
  sortOrder: 'asc' | 'desc';
  updateOrder: (id:string,updatedOrder: Order) => Promise<void>;
  cancleOrder: (kot: number) => Promise<void>;
  updateOrderStatus: (
   data:any
  ) => Promise<void>;
}

const ORDER_CONTEXT = createContext<OrderContextType>({
  orders: [],
  setOrderData: () => {},
  setSortField: () => {},
  sortField: 'orderTime',
  setSortOrder: () => {},
  sortOrder: 'desc',
  updateOrder: () => Promise.resolve(),
  cancleOrder: () => Promise.resolve(),
  updateOrderStatus: (data:any) => Promise.resolve(),
});

export const useOrders = () => useContext(ORDER_CONTEXT);

const OrderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [sortField, setSortField] = useState<string>('orderTime');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const getOrderData = async (data: Order[]) => {
    setOrders(data);
  };

  useEffect(() => {
    const getOrdersBySorting = async () => {
      try {
        const orders = await window.electron.getAllOrder();
        setOrders(orders);
      } catch (error) {
        console.log(error);
      }
    };
    getOrdersBySorting();

    return () => {
      getOrdersBySorting();
    };
  }, [sortField, sortOrder]);

  const setOrderData = async (data: Order) => {
    // await postData(newOrderData, ordersCollection);
  };

  const updateOrder = async (id: string, data: Order) => {
    try {
      const fetchedData = await window.electron.updateOrder(id, data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatus = async (
data:any
  ) => {
    try {
      window.electron.updateOrder(data.order_id,data)
    } catch (error) {
      console.log(error);
    }
  };

  const cancleOrder = async (kot: number) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ORDER_CONTEXT.Provider
      value={{
        orders,
        setOrderData,
        sortField,
        setSortField,
        sortOrder,
        setSortOrder,
        updateOrder,
        cancleOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </ORDER_CONTEXT.Provider>
  );
};

export default OrderContextProvider;
