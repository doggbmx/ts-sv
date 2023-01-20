import { Type } from 'typescript';
import { UpdateUser } from '../models/update_user_model';
import { User, id, USERTYPE } from '../models/user_model';
import { UserRepositories } from './user_repositories';
// import { CustomErrorHandler } from '../../../error/error_handler'

class UserRepositoriesImplementation implements UserRepositories {

    async getUser(id: id): Promise<User> {
        return this._call(() => {
            setTimeout(() => {
                console.log('getting..');
            }, 1000);
            let newUser = {
                userId: id,
                name: 'Cosme Fulanito',
                email: 'quemacoco@gmail.com',
                password: 'foofoo',
                userType: USERTYPE.BMX
            };
            return newUser as User;
        }, "Could not get the user")
    }

    async createUser (user: User): Promise<Boolean> {
        return this._call(() => {
            setTimeout(() => {
                console.log('posting..');
            }, 1000);
            // mocking send to db.
            return true;
        }, "Couldn't create the new user");        
    }

    async updateUser(user: User, data?: UpdateUser): Promise<User> {
        return this._call(() => {
            setTimeout(() => {
                console.log('updating..');
            }, 1000);
            let updatedUser = { user, ...data};
            return updatedUser as User;
        }, "Couldn't update the user");
    }
    
    _call<Type>(callback, errMessage: string): Promise<Type> {
        try {
            return callback();
        } catch (error) {
            console.log(errMessage);
            // throw CustomErrorHandler.fromGenericError(error);
            throw new Error;
        }
    }
}