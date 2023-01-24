import { User, id } from '../../domain/models/user_model';

export interface UserDataSource {
    getAllUsers(): Promise<User[]>;
    getUser(userId: string): Promise<User>;
}