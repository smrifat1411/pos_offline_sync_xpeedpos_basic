export interface User {
  id?: number;
  username: string;
  password_hash?: Buffer;
  password?: string;
  status?: number;
  name: string;
  role:string;
}

export interface Auth {
  username: string;
  password: string;
  name?: string;
}
