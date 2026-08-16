import { User } from 'renderer/types/user.type';
import { connect } from './Database.service';
import {
  hashPassword,
  isLegacyPlaintext,
  verifyPassword,
} from '../utils/encrypt';

/** True while the users table is still empty, i.e. during first-run setup. */
function isFirstUser(): boolean {
  try {
    const db = connect();
    const row: any = db.prepare('SELECT COUNT(*) AS count FROM users').get();
    return (row?.count ?? 0) === 0;
  } catch (error) {
    console.error('Could not count users:', error);
    return false;
  }
}

export interface Auth {
  username: string;
  password: string;
}

export interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function getUser(username: string): Promise<Result<User | null>> {
  try {
    const db = connect();

    const stm = db.prepare('SELECT * FROM users WHERE username = @username');
    const user: any = stm.get({ username });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Omit the password_hash from the returned user object
    // const { password_hash, ...userData } = user;

    return { success: true, data: user };
  } catch (error) {
    console.error('Error getting user:', error);
    return { success: false, error: 'Error getting user' };
  }
}

export async function login(user: Auth): Promise<Result<User | null>> {
  try {
    const result = await getUser(user.username);

    if (!result.success || !result.data) {
      return { success: false, error: 'Invalid username or password' };
    }

    const record = result.data as User & { password_hash?: string };

    // This check did not exist. Finding the username was treated as a
    // successful login, so any password - including an empty one - signed in as
    // any user that happened to exist.
    if (!verifyPassword(user.password, record.password_hash ?? '')) {
      return { success: false, error: 'Invalid username or password' };
    }

    // An account that predates hashing has just proved its password, so this is
    // the one moment it can be upgraded without asking anyone to reset it.
    if (isLegacyPlaintext(record.password_hash ?? '')) {
      try {
        const db = connect();
        db.prepare(
          'UPDATE users SET password_hash = @hash WHERE username = @username',
        ).run({ hash: hashPassword(user.password), username: user.username });
      } catch (error) {
        // The sign-in itself succeeded; failing to re-hash must not block it.
        console.error('Could not upgrade stored password:', error);
      }
    }

    // The renderer never needs the credential, and it used to receive it on
    // every login and keep it in localStorage.
    const { password_hash: _omit, ...safeUser } = record;

    return { success: true, data: safeUser as User };
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, error: 'Error during login' };
  }
}

export async function register(user: User): Promise<Result<boolean>> {
  try {
    const checkUserResult = await getUser(user.username);

    if (checkUserResult.success && checkUserResult.data) {
      return { success: false, error: 'Username already exists' };
    }

    const db = connect();

    // The column is called password_hash and used to be handed the password
    // itself, so every account was stored in plain text.
    const registerUser = user.password
      ? {
          username: user.username,
          password_hash: hashPassword(user.password),
          status: 1,
          // The first account to exist becomes the admin - the role gates the
          // settings and reporting sections, and hardcoding 'manager' meant an
          // admin could never be created through the app at all.
          role: isFirstUser() ? 'admin' : 'manager',
          name: user.name,
        }
      : undefined;

    const stm = db.prepare(
      `INSERT INTO users (username, password_hash, status, role, name)
      VALUES (@username, @password_hash, @status, @role, @name)`,
    );

    registerUser && stm.run(registerUser);

    return { success: true };
  } catch (error) {
    console.error('Error during registration:', error);
    return { success: false, error: 'Error during registration' };
  }
}

export async function getAllUsers(): Promise<Result<User[]>> {
  try {
    const db = connect();

    // Prepare the SQL statement to select all users
    const stm = db.prepare('SELECT * FROM users');

    // Execute the statement and fetch all users
    const users: any[] = stm.all();

    // Map the result to the PublicUser type, excluding password_hash
    const publicUsers: User[] = users.map(({ password_hash, ...rest }) => rest);

    return { success: true, data: publicUsers };
  } catch (error) {
    console.error('Error fetching all users:', error);
    return { success: false, error: 'Error fetching all users' };
  }
}
