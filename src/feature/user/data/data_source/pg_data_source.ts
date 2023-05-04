import { Pool, PoolClient, QueryResult } from "pg";
import { CustomError } from "../../../error/custom_error";
import { DataBaseError } from "../../../error/database_error";
import { CreateUser, User } from "../../../user/domain/models/user_model";
import { UserDataSource } from "../interfaces/user_data_source";
import {
  INSERT_USER_QUERY,
  INSERT_USER_TECH,
  SELECT_USERS_QUERY,
  SELECT_USER_BY_EMAIL,
  SELECT_USER_QUERY,
  SELECT_USER_WITH_TECH,
  UPDATE_USER_QUERY,
} from "../query_scripts/queries";
import { userFromPG } from "../utils/user_serializer";
import bcrypt from "bcrypt";

export class PGUsersDataSource implements UserDataSource {
  private db: Pool;
  private constructor(db: Pool) {
    this.db = db;
  }

  static instance: PGUsersDataSource | null = null;

  static create(dataSource: Pool) {
    if (PGUsersDataSource.instance == null) {
      PGUsersDataSource.instance = new PGUsersDataSource(dataSource);
    }
    return PGUsersDataSource.instance;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.callDataBase(SELECT_USERS_QUERY, [], (result) =>
      result.rows.map(userFromPG)
    );
  }

  async getUser(id: string): Promise<User> {
    return await this.callDataBase(SELECT_USER_QUERY, [id], (result) => {
      if (result.rowCount === 0) {
        throw new Error("user not found");
      }
      return userFromPG(result.rows[0]);
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.callDataBase(SELECT_USER_BY_EMAIL, [email], (result) => {
      if (result.rowCount === 0) {
        throw new Error();
      }
      return userFromPG(result.rows[0]);
    });
  }

  async createUser(data: CreateUser): Promise<User> {
    const hash = await bcrypt.hash(data.password!, 10);
    console.log(hash);
    return await this.callDataBase(
      INSERT_USER_QUERY,
      [data.name, data.email, hash],
      (result) => userFromPG(result.rows[0])
    );
  }

  async updateUser(data: User): Promise<User> {
    return await this.callDataBase(
      UPDATE_USER_QUERY,
      [data.userId, data.name, data.email, data.password, data.recoveryToken],
      (result) => userFromPG(result.rows[0])
    );
  }

  async getUserWithTech(userId: string): Promise<User> {
    return await this.callDataBase(
      SELECT_USER_WITH_TECH,
      [userId],
      (result) => {
        const formattedResult = {
          technologies: result.rows.reduce(
            (acc, curr) => [...acc, curr.tech_name],
            []
          ),
        };

        console.log(formattedResult);

        return userFromPG(formattedResult);
        // return result.rows.map((doc) => userFromPG(doc))
      }
    );
  }

  async createUserTech(userId: string, techId: string): Promise<User> {
    return await this.callDataBase(
      INSERT_USER_TECH,
      [userId, techId],
      (result) => userFromPG(result.rows[0])
    );
  }

  private async callDataBase<T>(
    query: string,
    values: any[],
    callback: (result: QueryResult<any>) => T
  ): Promise<T> {
    let client: PoolClient;
    client = await this.db.connect();
    try {
      const response = await client.query(query, values);
      return callback(response);
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw new DataBaseError(err as Error);
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}
