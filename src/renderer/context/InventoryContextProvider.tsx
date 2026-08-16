'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
  useContext,
} from 'react';

import { toast } from 'react-toastify';
import { Item, RxItem } from '../types/item.type';

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

function InventoryContextProvider({ children }: { children: ReactNode }) {
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
    } catch (error) {
      // Swallowed deliberately: this path has no user-facing recovery yet.
    }
  };

  const updateInventoryItem = async (updatedItem: Item) => {
    try {
      // Not implemented. Nothing in the UI calls this yet; the body was never
      // written, so it is marked rather than left looking like working code.
    } catch (error) {
      // Unreachable while the body above is empty; kept so the signature stays
      // async-safe once this is implemented.
    }
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
}

export default InventoryContextProvider;
