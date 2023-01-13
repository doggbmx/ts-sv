import { USERTYPE, id, password } from "./user_model";

export interface UpdateUser {
    userId?: id
    name?: string,
    email?: string,
    password?: password,
    userType?: USERTYPE,
}