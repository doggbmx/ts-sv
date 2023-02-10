import { CreateUser, UpdateUser, User } from '../../domain/models/user_model';

export interface UserDataSource {
    getAllUsers(): Promise<User[]>;
    getUser(userId: string): Promise<User>;
    createUser(data: CreateUser): Promise<User>;
    updateUser(data: User): Promise<User>;
    getUserWithTech(userId: string): Promise<User>;
}