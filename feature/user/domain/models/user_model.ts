export type id = string | number;
export type password = string;

export enum USERTYPE {
    SKATE = 'skate',
    BMX = 'bmx',
    INLINE = 'inline'
}

export interface User {
    userId: id
    name: string,
    email: string,
    password: password,
    userType: USERTYPE,
}

export interface CreateUser extends Omit<User, 'userId'> {}

export interface UpdateUser extends Partial<User> {}