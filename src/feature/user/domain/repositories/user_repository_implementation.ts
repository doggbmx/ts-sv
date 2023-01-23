import { Type } from 'typescript';
import { CustomError } from '../../../error/custom_error';
import { GenericError } from '../../../error/generic_error';
import { User, id, UpdateUser } from '../models/user_model';
import { UserRepositories } from './user_repositories';
import { UserDataSource } from '../../data/interfaces/user_data_source';
// import { CustomErrorHandler } from '../../../error/error_handler'

export class UserRepositoriesImplementation implements UserRepositories {
    private usersDataSource: UserDataSource;
    private constructor(dataSource: UserDataSource) {
        this.usersDataSource = dataSource;
    }

    static instance: UserRepositories | null = null;

    static create(dataSource: UserDataSource) {
        if (UserRepositoriesImplementation.instance == null) {
            UserRepositoriesImplementation.instance = new UserRepositoriesImplementation(dataSource);
        }
        return UserRepositoriesImplementation.instance;
    }

    async getUser(id?: id): Promise<User[]> {
        return await this.callDataSource(async () => {
            if (id) {
                return 'not developed yet!'
            } 
            return await this.usersDataSource.getAllUsers();
        });
    }

    async createUser (user: User): Promise<Boolean> {
        return this.callDataSource(() => {
            setTimeout(() => {
                console.log('posting..');
            }, 1000);
            // mocking send to db.
            return true;
        });        
    }

    async updateUser(user: User, data?: UpdateUser): Promise<User> {
        return this.callDataSource(() => {
            setTimeout(() => {
                console.log('updating..');
            }, 1000);
            let updatedUser = { user, ...data};
            return updatedUser as User;
        });
    }
    
    private async callDataSource<T>(callback: Function): Promise<T> {
        try {
            return await callback();
        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw new GenericError('Users Repositories error.');
        }
    }
}