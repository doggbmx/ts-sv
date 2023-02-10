export type password = string;


export interface User {
    userId: string
    name: string,
    email: string,
    password: password,
    techs: any
}

export interface CreateUser extends Omit<User, 'userId'> {}

export interface UpdateUser extends Partial<User> {}