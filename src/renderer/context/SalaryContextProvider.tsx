'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { Salary } from '../types/salary.type';

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

function SalaryContextProvider({ children }: Props) {
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
    } catch (error) {
      // Swallowed deliberately: this path has no user-facing recovery yet.
    }
  };

  const updateSalary = async (updatedSalary: Salary) => {
    try {
      // Not implemented. Nothing in the UI calls this yet; the body was never
      // written, so it is marked rather than left looking like working code.
    } catch (error) {
      // Unreachable while the body above is empty; kept so the signature stays
      // async-safe once this is implemented.
    }
  };

  const deleteSalaryInfo = async (salaryID: number | undefined) => {
    try {
      addToTrash('salary', salaryID);
    } catch (error) {
      // Swallowed deliberately: this path has no user-facing recovery yet.
    }
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
}

export default SalaryContextProvider;
