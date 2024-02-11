//? DB IMPORTS
import { pool } from "../services/database_service";
//? USER IMPORTS
import { PGUsersDataSource } from "../../feature/user/data/data_source/pg_data_source";
import { UserRepositoriesImplementation } from "../../feature/user/domain/repositories/user_repository_implementation";
import usersRouter from "../../feature/user/presentation/user_router";
//? AUTH IMPORTS
import { AuthRepositoryImplementation } from "../../feature/auth/domain/repositories/auth_reposityory_implementation";
import AuthRouter from "../../feature/auth/presentation/auth_router";


//? USER MODULE
const usersDataSource = PGUsersDataSource.create(pool);

export const usersRepository = UserRepositoriesImplementation.create(usersDataSource);

export const userRouter = usersRouter(usersRepository);

//? AUTH MODULE
export const authRepository =
  AuthRepositoryImplementation.create(usersRepository);

export const authRouter = AuthRouter(authRepository);