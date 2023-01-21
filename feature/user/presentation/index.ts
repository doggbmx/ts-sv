import { pool } from '../../../src/core/services/database_service';
import { PGUsersDataSource } from '../data/data_source/pg_data_source';
import { UserRepositoriesImplementation } from '../domain/repositories/user_repository_implementation';
import usersRouter from './user_router';

const usersDataSource = PGUsersDataSource.create(pool);

const usersRepository = UserRepositoriesImplementation.create