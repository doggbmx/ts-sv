import { Type } from 'typescript';
import { CustomError } from '../../../error/custom_error';
import { GenericError } from '../../../error/generic_error';
import { User, id, USERTYPE, UpdateUser } from '../models/user_model';
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
    }

    async getUser(id?: id): Promise<User[]> {
        return await this._callDataSource(async () => {
            if (id) {
                return 'not developed yet!'
            } 
            return await this.usersDataSource.getAllUsers();
        }, "Could not get the user");
    }

    async createUser (user: User): Promise<Boolean> {
        return this._callDataSource(() => {
            setTimeout(() => {
                console.log('posting..');
            }, 1000);
            // mocking send to db.
            return true;
        }, "Couldn't create the new user");        
    }

    async updateUser(user: User, data?: UpdateUser): Promise<User> {
        return this._callDataSource(() => {
            setTimeout(() => {
                console.log('updating..');
            }, 1000);
            let updatedUser = { user, ...data};
            return updatedUser as User;
        }, "Couldn't update the user");
    }
    
    private async _callDataSource<Type>(callback: Function, errMessage: string): Promise<Type> {
        try {
            return await callback();
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new GenericError('Users Repositories error.');
        }
    }
}