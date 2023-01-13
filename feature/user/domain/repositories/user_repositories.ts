import { UpdateUser } from '../models/update_user_model';
import { User, id } from '../models/user_model';

export interface UserRepositories {
    getUser(id: id): Promise<User>;
    createUser(user: User): Promise<Boolean>;
    updateUser(user: User, data?:UpdateUser): Promise<User>;
};