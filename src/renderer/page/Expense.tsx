import { useEffect } from 'react';
import {
  useExpenseContext
} from 'renderer/context/ExpenseContext';
import ExpenseTable from 'renderer/features/expense/ExpenseTable';

const Expense = () => {
  const { getAllExpenses } = useExpenseContext();

  useEffect(() => {
    getAllExpenses();
  }, []);

  return (
    // <ExpenseProvider>
    <div>
      {/* <CreateExpForm /> */}
      <ExpenseTable />
    </div>
    // </ExpenseProvider>
  );
};

export default Expense;
