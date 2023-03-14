import { pool } from "../../../core/services/database_service";
import { PGUsersDataSource } from "../../user/data/data_source/pg_data_source";
import { UserRepositoriesImplementation } from "../../user/domain/repositories/user_repository_implementation";
import AuthRouter from "./auth_router";

export const authRouter = AuthRouter();