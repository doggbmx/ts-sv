
import { CreateUser, UpdateUser, User } from '../models/user_model';

export interface UserRepositories {
    getUser(id?: string): Promise<User[]>;
    createUser(data: CreateUser): Promise<User>;
    updateUser(user: User, data?:UpdateUser): Promise<User>;
};