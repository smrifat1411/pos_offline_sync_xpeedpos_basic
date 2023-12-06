import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CommonUtils } from '../utils/CommonUtils';
import { Order } from '../types/order.type';

interface OrderContextType {
  orders: Order[];
  getAllOrdersData: (
    page?: number,
    pageSize?: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
  ) => void;
  totalOrderCount: number;
  setOrdersData: (data: Order) => void;
  setSortField: Dispatch<SetStateAction<string>>;
  setSortOrder: Dispatch<SetStateAction<'desc' | 'asc'>>;
  sortField: string;
  sortOrder: 'asc' | 'desc';
  updateOrder: (id: string, updatedOrder: Order) => Promise<void>;
  cancelOrder: (id: number) => Promise<void>;
  updateOrderStatus: (data: any) => Promise<void>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const ORDER_CONTEXT = createContext<OrderContextType>({
  orders: [],
  totalOrderCount: 0,
  setOrdersData: () => {},
  setSortField: () => {},
  sortField: 'orderTime',
  setSortOrder: () => {},
  sortOrder: 'asc',
  getAllOrdersData: () => {},
  updateOrder: async () => {},
  cancelOrder: async () => {},
  updateOrderStatus: async () => {},
  currentPage: 1,
  setCurrentPage: () => {},
});

export const useOrders = () => useContext(ORDER_CONTEXT);

const OrderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [sortField, setSortField] = useState<string>('orderTime');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const [totalOrderCount, setTotalOrderCount] = useState(0);

  const getAllOrdersData = async (
    page?: number,
    pageSize?: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
  ) => {
    try {
      const result = await window.electron.getAllOrder(
        page,
        pageSize,
        sortBy,
        sortOrder,
      );
      if (result.success) {
        setOrders(result.data);
      } else {
        CommonUtils().showToast(
          'error',
          result.error || 'Error fetching orders',
        );
      }
    } catch (error) {
      console.log(error);
      CommonUtils().showToast('error', 'Error fetching orders');
    }
  };

  const setOrdersData = async (data: Order) => {
    // You can implement this if needed
  };

  const updateOrder = async (id: string, data: Order) => {
    try {
      const result = await window.electron.updateOrder(id, data);
      if (result.success) {
        CommonUtils().showToast('success', 'Order updated successfully');
        await getAllOrdersData();
      } else {
        CommonUtils().showToast(
          'error',
          result.error || 'Error updating order',
        );
      }
    } catch (error) {
      console.log(error);
      CommonUtils().showToast('error', 'Error updating order');
    }
  };

  const updateOrderStatus = async (data: any) => {
    try {
      const result = await window.electron.updateOrder(data.id, data);
      if (result.success) {
        CommonUtils().showToast(
          'success',
          `${
            result.data.paymentStatus === 'payment done'
              ? `Payment Done, give back ${result.data.changeAmount}tk`
              : 'Order status updated successfully'
          }`,
        );
        await getAllOrdersData();
      } else {
        CommonUtils().showToast(
          'error',
          result.error || 'Error updating order status',
        );
      }
    } catch (error) {
      console.log(error);
      CommonUtils().showToast('error', 'Error updating order status');
    }
  };

  const cancelOrder = async (id: number) => {
    // Implement cancelOrder if needed
  };

  return (
    <ORDER_CONTEXT.Provider
      value={{
        getAllOrdersData,
        totalOrderCount,
        orders,
        setOrdersData,
        sortField,
        setSortField,
        sortOrder,
        setSortOrder,
        updateOrder,
        cancelOrder,
        updateOrderStatus,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </ORDER_CONTEXT.Provider>
  );
};

export default OrderContextProvider;
