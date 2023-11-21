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
  getAllOrdersData:()=>void;
  setOrdersData: (data: Order | any) => void;
  setSortField: Dispatch<SetStateAction<string>>;
  setSortOrder: Dispatch<SetStateAction<'desc' | 'asc'>>;
  sortField: string;
  sortOrder: 'asc' | 'desc';
  updateOrder: (id: string, updatedOrder: Order) => Promise<void>;
  cancleOrder: (kot: number) => Promise<void>;
  updateOrderStatus: (data: any) => Promise<void>;
}

const ORDER_CONTEXT = createContext<OrderContextType>({
  orders: [],
  setOrdersData: () => {},
  setSortField: () => {},
  sortField: 'orderTime',
  setSortOrder: () => {},
  sortOrder: 'desc',
  getAllOrdersData:() =>{},
  updateOrder: () => Promise.resolve(),
  cancleOrder: () => Promise.resolve(),
  updateOrderStatus: (data: any) => Promise.resolve(),
});

export const useOrders = () => useContext(ORDER_CONTEXT);

const OrderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [sortField, setSortField] = useState<string>('orderTime');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const getAllOrdersData = async () => {
    const fetchedAllData = await window.electron.getAllOrder();
    setOrders(fetchedAllData);
  };

  const setOrdersData = async (data: Order) => {
    // await postData(newOrderData, ordersCollection);
  };

  const updateOrder = async (id: string, data: Order) => {
    try {
      const fetchedData = await window.electron.updateOrder(id, data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatus = async (data: any) => {
    try {
      await window.electron.updateOrder(data.order_id, data);
      fetchUpdatedOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUpdatedOrders = async () => {
    const data = await window.electron.getAllOrder();
    setOrders(data);
  };

  const cancleOrder = async (kot: number) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrdersData();
  }, []);

  return (
    <ORDER_CONTEXT.Provider
      value={{
        getAllOrdersData,
        orders,
        setOrdersData,
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
