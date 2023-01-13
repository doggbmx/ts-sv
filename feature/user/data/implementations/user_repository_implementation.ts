import { UpdateUser } from '../../domain/models/update_user_model';
import { User, id, USERTYPE } from '../../domain/models/user_model';
import { UserRepositories } from '../../domain/repositories/user_repositories';

class UserRepositoriesImplementation implements UserRepositories {
    
    async getUser(id: id): Promise<User> {
        try {
            setTimeout(() => {
                console.log('getting..');
            }, 1000);
            let newUser = {
                userId: 1,
                name: 'Cosme Fulanito',
                email: 'quemacoco@gmail.com',
                password: 'foofoo',
                userType: USERTYPE.BMX
            };
            return newUser as User;
        } catch (error) {
            console.log(error);
            throw(error);
        }
    }

    async createUser(user: User): Promise<Boolean> {
        try {
            setTimeout(() => {
                console.log('posting..');
            }, 1000);
            // mocking send to db.
            return true;
        } catch (error) {
            console.log(error);
            throw(error);
        }
    }

    async updateUser(user: User, data?: UpdateUser): Promise<User> {
        try {
            setTimeout(() => {
                console.log('updating..');
            }, 1000);
            let updatedUser = { user, ...data};
            return updatedUser as User;
        } catch (error) {
            console.log(error);
            throw(error);
        }
    }
    
}