'use client';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { Salary } from '../types/salary.type';

import { toast } from 'react-toastify';
import { useSettings } from './settingsContextProvider';

interface SalaryContextInterface {
  salaries: [];
  setSalaries: Dispatch<SetStateAction<[]>>;
  createSalaryData: (data: Salary) => Promise<void>;
  updateSalary: (updatedSalary: Salary) => Promise<void>;
  deleteSalaryInfo: (salaryID: number | undefined) => Promise<void>;
}

type Props = {
  children: ReactNode;
};

const SALARYCONTEXT = createContext<SalaryContextInterface>({
  salaries: [],
  setSalaries: () => {},
  createSalaryData: () => Promise.resolve(),
  updateSalary: () => Promise.resolve(),
  deleteSalaryInfo: () => Promise.resolve(),
});

export const useSalaries = () => useContext(SALARYCONTEXT);

const SalaryContextProvider = ({ children }: Props) => {
  const [salaries, setSalaries] = useState<[]>([]);

  const { addToTrash } = useSettings();

  const getSalariesData = async (data: []) => {
    setSalaries(data);
  };

  const createSalaryData = async (data: Salary) => {
    try {
      const newSalaryData: Salary = {
        _id: Date.now(),
        employeeName: data.employeeName,
        salaryForThatMonth: data.salaryForThatMonth,
        salaryAmount: data.salaryAmount,
        isOnline: false,
      };
    } catch (error) {}
  };

  const updateSalary = async (updatedSalary: Salary) => {
    try {
    } catch (error) {}
  };

  const deleteSalaryInfo = async (salaryID: number | undefined) => {
    try {
      addToTrash('salary', salaryID);
    } catch (error) {}
  };

  return (
    <SALARYCONTEXT.Provider
      value={{
        salaries,
        setSalaries,
        createSalaryData,
        updateSalary,
        deleteSalaryInfo,
      }}
    >
      {children}
    </SALARYCONTEXT.Provider>
  );
};

export default SalaryContextProvider;
