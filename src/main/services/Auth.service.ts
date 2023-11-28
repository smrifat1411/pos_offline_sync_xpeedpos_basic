import { User } from 'renderer/types/user.type';
import { connect } from './Database.service';
import { decriptText, hashText } from '../utils/encrypt';

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
    const { password_hash, ...userData } = user;
    return { success: true, data: userData as User };
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

    const passwordCheck =
      result.data.password_hash && decriptText(result.data.password_hash);

    if (passwordCheck && passwordCheck !== user.password) {
      return { success: false, error: 'Invalid username or password' };
    }

    return { success: true, data: result.data };
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

    const registerUser = user.password
      ? {
          username: user.username,
          password_hash: hashText(user?.password),
          status: 1,
          role: 'manager',
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
