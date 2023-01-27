
import { CreateUser, UpdateUser, User } from '../models/user_model';

export interface UserRepositories {
    getUser(id?: string): Promise<User[]>;
    createUser(data: CreateUser): Promise<User>;
    updateUser(userId: string, data:UpdateUser): Promise<User>;
};