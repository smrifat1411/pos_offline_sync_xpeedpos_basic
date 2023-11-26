import { User } from 'renderer/types/user.type';
import { decriptText, hashText } from '../utils/encrypt';
import { connect } from './Database.service';

export function getUser(username: string) {
  const db = connect();

  const stm = db.prepare('SELECT * FROM users where username = @username');

  return stm.get({ username }) as User | undefined;
}

export function login(user: Auth) {
  const dbUser: any = getUser(user.username);

  if (!dbUser) return false;

  const passwordCheck = decriptText(dbUser.password_hash) || undefined;

  if (passwordCheck && passwordCheck !== user.password) {
    return false;
  }

  const userDetails = { pasword_hash: __dirname, ...dbUser };
  return userDetails;
}

export function register(user: Auth) {
  try {
    const checkUser = getUser(user.username);

    if (checkUser) return false;

    const db = connect();

    const registerUser = {
      name: user.name,
      username: user.username,
      password_hash: hashText(user.password),
      status: 1,
      role: 'manager',
    };

    const stm = db.prepare(
      `INSERT INTO users (username, password_hash, status,role)
    VALUES (@name, @username, @password_hash, @status,@role)`,
    );

    stm.run(registerUser);

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}

export function getAllUsers(): User[] {
  const db = connect();

  // Prepare the SQL statement to select all users
  const stm = db.prepare('SELECT * FROM users');

  // Execute the statement and fetch all users
  try {
    const users: any = stm.all();

    // Map the result to the PublicUser type, excluding password_hash
    const publicUsers: User[] = users.map(
      ({ password_hash, ...rest }: { password_hash: Buffer }) => rest,
    );

    return publicUsers;
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];
  }
}
