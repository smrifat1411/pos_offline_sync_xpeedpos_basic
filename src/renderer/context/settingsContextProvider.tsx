'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import { RxSettings } from '../types/settings.type';

interface SettingsContextInterface {
  settings: RxSettings[];
  setSettings: Dispatch<SetStateAction<RxSettings[]>>;
  changeDiscountAmount: (amount: number) => Promise<void>;
  changeVATAmount: (amount: number) => Promise<void>;
  addToTrash: (
    name: 'inventory' | 'products' | 'salary' | 'tables',
    value: any | string | number,
  ) => Promise<void>;
}

type Props = {
  children: ReactNode;
};

const SETTINGSCONTEXT = createContext<SettingsContextInterface>({
  settings: [],
  setSettings: () => {},
  changeDiscountAmount: () => Promise.resolve(),
  changeVATAmount: () => Promise.resolve(),
  addToTrash: () => Promise.resolve(),
});

export const useSettings = () => useContext(SETTINGSCONTEXT);

const SettingsContextProvider = ({ children }: Props) => {
  const [settings, setSettings] = useState<RxSettings[]>([]);

  const getSettingsData = async (data: RxSettings[]) => {
    setSettings(data);
  };

  const changeDiscountAmount = async (amount: number) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const changeVATAmount = async (amount: number) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const addToTrash = async (
    name: 'inventory' | 'products' | 'salary' | 'tables',
    value: any | string | number,
  ) => {
    try {
      const newTrash = settings[0]?._data?.trash;
      newTrash[name] = [...newTrash[name], value];
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SETTINGSCONTEXT.Provider
      value={{
        settings,
        setSettings,
        changeDiscountAmount,
        changeVATAmount,
        addToTrash,
      }}
    >
      {children}
    </SETTINGSCONTEXT.Provider>
  );
};

export default SettingsContextProvider;
