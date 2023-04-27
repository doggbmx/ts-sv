import { pool } from "../../../core/services/database_service";
import { PGUsersDataSource } from "../../user/data/data_source/pg_data_source";
import { UserRepositoriesImplementation } from "../../user/domain/repositories/user_repository_implementation";
import AuthRouter from "./auth_router";
import { AuthRepositoryImplementation } from "../domain/repositories/auth_reposityory_implementation";
import { usersRepository } from "../../user/presentation";

export const authRepository =
  AuthRepositoryImplementation.create(usersRepository);

export const authRouter = AuthRouter(authRepository);
