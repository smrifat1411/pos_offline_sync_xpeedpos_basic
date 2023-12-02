import { connect } from './Database.service';

export interface DailyCashEntry {
  id?: number;
  date: number;
  closingBalance: number;
  withdrawnAmount?: number;
}

export async function getDailyCashEntryByDate(
  date: number,
): Promise<{ success: boolean; data?: DailyCashEntry; error?: string }> {
  try {
    const db = connect();

    const stm = db.prepare('SELECT * FROM dailycash WHERE date = @date');


    const entry = stm.get({ date }) as DailyCashEntry | undefined;

    return { success: true, data: entry, error: undefined };
  } catch (error) {
    console.error('Error getting daily cash entry by date:', error);
    return {
      success: false,
      data: undefined,
      error: 'Error getting daily cash entry by date.',
    };
  }
}

export async function getClosingBalanceFromPreviousDay(
  currentDate: number,
): Promise<{ success: boolean; data?: number; error?: string }> {
  try {
    const db = connect();

    const previousDay = new Date(currentDate - 24 * 60 * 60 * 1000); // Subtract one day in milliseconds
    const previousDayTimestamp = previousDay.getTime();

    const stm = db.prepare(
      'SELECT closingBalance FROM dailycash WHERE date = @date',
    );
    const result = stm.get({ date: previousDayTimestamp }) as {
      closingBalance?: number;
    };

    const closingBalance = result?.closingBalance;

    return { success: true, data: closingBalance || 0, error: undefined };
  } catch (error) {
    console.error(
      'Error getting closing balance from the previous day:',
      error,
    );
    return {
      success: false,
      data: undefined,
      error: 'Error getting closing balance from the previous day.',
    };
  }
}

export async function createDailyCashEntry(
  entry: DailyCashEntry,
): Promise<{ success: boolean; data?: DailyCashEntry; error?: string }> {
  try {
    const existingEntryResult = await getDailyCashEntryByDate(entry.date);

    if (existingEntryResult.success && existingEntryResult.data) {
      // If entry already exists, update it
      return await updateDailyCashEntry(entry.date, entry);
    } else {
      // If entry doesn't exist, create it
      return await insertDailyCashEntry(entry);
    }
  } catch (error) {
    console.error('Error creating or updating daily cash entry:', error);
    return {
      success: false,
      error: 'Error creating or updating daily cash entry.',
    };
  }
}

async function insertDailyCashEntry(
  entry: DailyCashEntry,
): Promise<{ success: boolean; data?: DailyCashEntry; error?: string }> {
  try {
    const db = connect();

    const stm = db.prepare(
      'INSERT INTO dailycash (date, closingBalance, withdrawnAmount) VALUES (@date, @closingBalance, @withdrawnAmount)',
    );

    const result: { lastInsertRowid: number } = await new Promise(
      (resolve, reject) => {
        try {
          const runResult = stm.run(entry);
          resolve({ lastInsertRowid: Number(runResult.lastInsertRowid) });
        } catch (error) {
          reject(error);
        }
      },
    );

    const newEntryId = result.lastInsertRowid;

    const newEntry = (await getDailyCashEntryByDate(entry.date))
      .data as DailyCashEntry;

    if (!newEntry) {
      console.error('Error retrieving the newly created daily cash entry.');
      return {
        success: false,
        error: 'Error retrieving the newly created daily cash entry.',
      };
    }

    console.log('Daily cash entry created successfully.');
    return { success: true, data: newEntry };
  } catch (error) {
    console.error('Error creating daily cash entry:', error);
    return { success: false, error: 'Error creating daily cash entry.' };
  }
}
export async function updateDailyCashEntry(
  date: number,
  updatedEntryData: any,
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const db = connect();

    const updateFields = Object.keys(updatedEntryData)
      .map((key) => `${key} = @${key}`)
      .join(', ');

    const stm = db.prepare(
      `UPDATE dailycash
      SET ${updateFields}
      WHERE date = @date`,
    );

    const updateEntry = {
      date: date,
      ...updatedEntryData,
    };

    await new Promise<void>((resolve, reject) => {
      try {
        stm.run(updateEntry);
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    // Fetch the updated daily cash entry data from the database
    const updatedEntry = db
      .prepare('SELECT * FROM dailycash WHERE date = ?')
      .get(date);

    console.log('Daily cash entry updated successfully.');
    return { success: true, data: updatedEntry };
  } catch (error) {
    console.error('Error updating daily cash entry:', error);
    return { success: false, error: 'Error updating daily cash entry.' };
  }
}

export async function createOrUpdateDailyCashEntry(
  entry: DailyCashEntry,
): Promise<{ success: boolean; data?: DailyCashEntry; error?: string }> {
  try {
    const existingEntryResult = await getDailyCashEntryByDate(entry.date);

    if (existingEntryResult.success && existingEntryResult.data) {
      // If entry already exists, update it
      return await updateDailyCashEntry(entry.date, entry);
    } else {
      // If entry doesn't exist, create it with the closing balance from the previous day
      const closingBalanceFromPreviousDayResult =
        await getClosingBalanceFromPreviousDay(entry.date);
      const closingBalanceFromPreviousDay =
        closingBalanceFromPreviousDayResult.success
          ? closingBalanceFromPreviousDayResult.data || 0
          : 0;

      const newClosingBalance =
        closingBalanceFromPreviousDay + (entry.closingBalance || 0);

      return await createDailyCashEntry({
        ...entry,
        closingBalance: newClosingBalance,
      });
    }
  } catch (error) {
    console.error('Error creating or updating daily cash entry:', error);
    return {
      success: false,
      error: 'Error creating or updating daily cash entry.',
    };
  }
}
