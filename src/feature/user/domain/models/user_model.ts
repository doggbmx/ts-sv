export type id = string | number;
export type password = string;


export interface User {
    userId: id
    name: string,
    email: string,
    password: password,
    userType: string,
}

export interface CreateUser extends Omit<User, 'userId'> {}

export interface UpdateUser extends Partial<User> {}