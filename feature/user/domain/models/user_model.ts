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