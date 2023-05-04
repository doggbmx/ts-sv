export interface User {
  userId: string;
  name: string;
  email: string;
  password?: string;
  recoveryToken?: string | null;
  techs: any;
}

export interface CreateUser extends Omit<User, "userId"> {}

export interface UpdateUser extends Partial<User> {}
