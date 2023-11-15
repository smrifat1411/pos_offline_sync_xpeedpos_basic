'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
  useContext,
} from 'react';

import { Item, RxItem } from '../types/item.type';

import { toast } from 'react-toastify';
import { useSettings } from './settingsContextProvider';

interface InventoryInterface {
  inventory: RxItem[];
  setInventory: Dispatch<SetStateAction<[]>>;
  createInventoryData: (data: Item) => Promise<void>;
  updateInventoryItem: (updatedItem: Item) => Promise<void>;
  deleteInventoryItem: (itemID: number | undefined) => Promise<void>;
}

const INVENTORY_CONTEXT = createContext<InventoryInterface>({
  inventory: [],
  setInventory: () => {},
  createInventoryData: () => Promise.resolve(),
  updateInventoryItem: () => Promise.resolve(),
  deleteInventoryItem: () => Promise.resolve(),
});

export const useInventory = () => useContext(INVENTORY_CONTEXT);

const InventoryContextProvider = ({ children }: { children: ReactNode }) => {
  const [inventory, setInventory] = useState<[]>([]);

  const { addToTrash } = useSettings();

  const getOrderData = async (data: []) => {
    setInventory(data);
  };

  const createInventoryData = async (data: Item) => {
    try {
      const newInventoryData: Item = {
        _id: data._id,
        itemName: data.itemName,
        quantity: data.quantity,
        totalPrice: data.totalPrice,
        purchasedDate: data.purchasedDate,
        isOnline: false,
      };
      // await postData(newInventoryData, inventoryCollection);
    } catch (error) {}
  };

  const updateInventoryItem = async (updatedItem: Item) => {
    try {
    } catch (error) {}
  };

  const deleteInventoryItem = async (itemID: number | undefined) => {};

  return (
    <INVENTORY_CONTEXT.Provider
      value={{
        inventory,
        setInventory,
        createInventoryData,
        updateInventoryItem,
        deleteInventoryItem,
      }}
    >
      {children}
    </INVENTORY_CONTEXT.Provider>
  );
};

export default InventoryContextProvider;
