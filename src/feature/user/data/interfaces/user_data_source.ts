import { User } from '../../domain/models/user_model';

export interface UserDataSource {
    getAllUsers(): Promise<User[]>;
}