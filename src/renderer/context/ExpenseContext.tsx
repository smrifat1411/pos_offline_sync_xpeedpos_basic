// ExpenseContext.ts

import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { TOAST_TYPE } from 'renderer/constants/AppConstants';
import { Expense } from 'renderer/types/expense.type';
import { CommonUtils } from 'renderer/utils/CommonUtils';

interface ExpenseContextProps {
  allExpenses: Expense[];
  setAllExpenses: Dispatch<SetStateAction<Expense[]>>;
  getExpenseById: (expenseId: number) => Expense | undefined;
  updateExpenseById: (
    expenseId: number,
    updatedExpense: Expense,
  ) => Promise<void>;
  createExpense: (newExpense: Expense) => Promise<void>;
  getAllExpenses: () => Promise<void>;
  getExpensesByPeriod: (period: string) => Promise<void>;
  totalAmount: number;
}

const ExpenseContext = createContext<ExpenseContextProps | undefined>(
  undefined,
);

interface ExpenseProviderProps {
  children: ReactNode;
}

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({
  children,
}) => {
  const [allExpenses, setAllExpenses] = React.useState<Expense[]>([]);
  const [totalAmount, setTotalAmount] = React.useState<number>(0);

  const getExpenseById = (expenseId: number): Expense | undefined => {
    return allExpenses.find((expense) => expense.id === expenseId);
  };

  const updateExpenseById = async (
    expenseId: number,
    updatedExpense: Expense,
  ) => {
    try {
      // Update operation code...
      // Update state...
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const createExpense = async (newExpense: Expense): Promise<void> => {
    try {
      const result = await window.electron.createExpense(newExpense);

      if (result.success && result.data) {
        CommonUtils().showToast(
          TOAST_TYPE.WARNING,
          `You have costed ${result.data.amount}`,
        );

        setAllExpenses((prev) => [...prev, result.data]);

        return result.data
      } else {
        console.error('Error creating expense:', result.error);
      }
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  const getAllExpenses = async (): Promise<void> => {
    try {
      await getExpensesByPeriod('daily');
    } catch (error) {
      console.error('Error fetching all expenses:', error);
    }
  };

  const getExpensesByPeriod = async (period: string): Promise<void> => {
    try {
      const result = await window.electron.getAllExpensesByPeriod(period);

      if (result.success) {
        setAllExpenses(result.data || []);
      } else {
        console.error(`Error getting ${period} expenses:`, result.error);
      }
    } catch (error) {
      console.error(`Error getting ${period} expenses:`, error);
    }
  };

  useEffect(() => {
    const calculateTotalAmount = () => {
      const amount = allExpenses.reduce(
        (total, expense) => total + expense.amount,
        0,
      );
      setTotalAmount(amount);
    };

    calculateTotalAmount();
  }, [allExpenses]);

  return (
    <ExpenseContext.Provider
      value={{
        totalAmount,
        allExpenses,
        setAllExpenses,
        getExpenseById,
        updateExpenseById,
        createExpense,
        getAllExpenses,
        getExpensesByPeriod,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = (): ExpenseContextProps => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
};
