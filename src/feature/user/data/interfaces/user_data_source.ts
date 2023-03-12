import { CreateUser, UpdateUser, User } from '../../domain/models/user_model';

export interface UserDataSource {
    getAllUsers(): Promise<User[]>;
    getUser(userId: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    createUser(data: CreateUser): Promise<User>;
    updateUser(data: User): Promise<User>;
    getUserWithTech(userId: string): Promise<User>;
    createUserTech(userId:string, techId:string): Promise<User>;
}