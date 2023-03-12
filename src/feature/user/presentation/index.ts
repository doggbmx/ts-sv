
import { pool } from '../../../core/services/database_service';
import { PGUsersDataSource } from '../data/data_source/pg_data_source';
import { UserRepositoriesImplementation } from '../domain/repositories/user_repository_implementation';
import UsersRouter from './user_router';

const usersDataSource = PGUsersDataSource.create(pool);

export const usersRepository = UserRepositoriesImplementation.create(usersDataSource);

export const usersRouter = UsersRouter(usersRepository);