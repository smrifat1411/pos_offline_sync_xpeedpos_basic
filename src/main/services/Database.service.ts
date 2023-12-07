import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

export type TODO = {
  id?: number;
  title: string;
  date: string;
  status: number;
};

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

let cachedConnection: any | null = null;

export function connect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const databasePath = isDevelopment
    ? path.join(__dirname, '../../../', 'release/app', 'database.db')
    : path
        .join(__dirname, '../../database.db')
        .replace('app.asar', 'app.asar.unpacked');

  // Check if the database file exists
  const doesDatabaseExist = fs.existsSync(databasePath);

  if (!doesDatabaseExist) {
    console.log('Creating a new database connection');
  }

  cachedConnection = Database(path.resolve(databasePath), {
    verbose: console.log,
    fileMustExist: true,
  });

  return cachedConnection;
}
