import React, { useEffect, useState } from 'react';
import {
  ExpenseProvider,
  useExpenseContext,
} from 'renderer/context/ExpenseContext';
import CreateExpForm from 'renderer/features/expense/CreateExpForm';
import ExpenseTable from 'renderer/features/expense/ExpenseTable';
import InventoryTable from 'renderer/features/purchase/InventoryTable';

const Expense = () => {
  const { allExpenses, getAllExpenses } = useExpenseContext();

  useEffect(() => {
    getAllExpenses();
  }, []);

  return (
    // <ExpenseProvider>
    <div>
      {/* <CreateExpForm /> */}
      {allExpenses.length > 0 && <ExpenseTable allExpenses={allExpenses} />}
    </div>
    // </ExpenseProvider>
  );
};

export default Expense;
