import { connect } from './Database.service';

export interface Expense {
  id?: number;
  amount: number;
  username: string;
  name?: string;
  time: number;
  details?: string;
}

export interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function createExpense(
  expense: Expense,
): Promise<Result<Expense | null>> {
  try {
    const db = connect();

    // Insert expense details into the 'expenses' table
    const insertExpense = {
      amount: expense.amount,
      name: expense.username,
      time: Date.now(),
      details: expense.details,
    };

    const insertExpenseStatement = db.prepare(
      `INSERT INTO expenses (amount, name, time, details)
        VALUES (@amount, @name, @time, @details)`,
    );

    const { lastInsertRowid: expenseId } =
      insertExpenseStatement.run(insertExpense);

    // Retrieve the created expense and return
    const selectExpenseStatement = db.prepare(
      `SELECT * FROM expenses WHERE id = @expenseId`,
    );

    const expenseData: any = selectExpenseStatement.get({ expenseId });

    console.log('Expense created successfully.');
    return { success: true, data: expenseData as Expense };
  } catch (error) {
    console.error('Error creating expense:', error);
    return { success: false, error: 'Error creating expense.' };
  }
}

export async function getExpensesByPeriod(
  period?: string,
  page?: number,
  pageSize?: number,
  filterField?: string,
  filterValue?: string,
  sortOrder: 'asc' | 'desc' = 'desc',
): Promise<Result<Expense[]>> {
  try {
    const db = connect();

    let query = 'SELECT * FROM expenses';

    // Adjust the query based on the specified time period
    if (period) {
      switch (period) {
        case 'daily':
          query +=
            " WHERE time >= strftime('%s', 'now', 'start of day') * 1000";
          break;
        case 'weekly':
          query += " WHERE time >= strftime('%s', 'now', '-7 days') * 1000";
          break;
        case 'monthly':
          query +=
            " WHERE time >= strftime('%s', 'now', 'start of month') * 1000 AND time < strftime('%s', 'now', 'start of month', '+1 month') * 1000";
          break;
        case 'yearly':
          query +=
            " WHERE time >= strftime('%s', 'now', 'start of year') * 1000 AND time < strftime('%s', 'now', 'start of year', '+1 year') * 1000";
          break;
        default:
          break;
      }
    }

    // Apply filtering if filterField and filterValue are provided
    if (filterField && filterValue) {
      query +=
        (period ? ' AND' : ' WHERE') +
        ` ${filterField} LIKE '%${filterValue}%'`;
    }

    // Apply sorting
    query += ` ORDER BY ${filterField || 'time'} ${
      sortOrder?.toUpperCase() || 'ASC'
    }`;

    // Apply pagination if page and pageSize are provided
    if (page !== undefined && pageSize !== undefined) {
      const offset = (page - 1) * pageSize;
      query += ` LIMIT ${pageSize} OFFSET ${offset}`;
    }

    const stm = db.prepare(query);
    const expenses: any = stm.all();

    console.log('Expenses found:', expenses.length);
    return { success: true, data: expenses as Expense[] };
  } catch (error) {
    console.error(`Error getting ${period || 'all'} expenses:`, error);
    return {
      success: false,
      error: `Error getting ${period || 'all'} expenses.`,
    };
  }
}
