export interface User {
  id?: number;
  username: string;
  password_hash: Buffer;
  status: number;
}

export interface Auth {
  username: string;
  password: string;
}
