declare type User = {
  id?: number;
  username: string;
  password_hash?: Buffer;
  status?: number;
  name: string;
  role:string;
};

declare type Auth = {
  username: string;
  password: string;
  name?: string;
};
