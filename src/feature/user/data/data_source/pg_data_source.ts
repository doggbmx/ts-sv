import { Pool, PoolClient, QueryResult } from 'pg';
import { CustomError } from '../../../error/custom_error';
import { DataBaseError } from '../../../error/database_error';
import { CreateUser, User } from '../../../user/domain/models/user_model';
import { UserDataSource } from '../interfaces/user_data_source';
import { INSERT_USER_QUERY, SELECT_USERS_QUERY, SELECT_USER_QUERY } from '../query_scripts/queries';
import { userFromPG } from '../utils/user_serializer';

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
        return await this.callDataBase(SELECT_USERS_QUERY, [], (result) => result.rows.map(userFromPG)); 
    }

    async getUser(id: string): Promise<User> {
        return await this.callDataBase(SELECT_USER_QUERY, [id], (result) => {
            if (result.rowCount === 0) {
                throw new Error;
            }
            return userFromPG(result.rows[0]);
        });
    }

    async createUser(data: CreateUser): Promise<User> {
        return await this.callDataBase(INSERT_USER_QUERY, [data.name, data.email, data.password, data.userType], (result) => userFromPG(result.rows[0]));
    }


    private async callDataBase<T>(query: string, values: any[], callback: (result: QueryResult<any>) => T): Promise<T> {
        let client: PoolClient;
        client = await this.db.connect();
        try {
            const response = await client.query(query, values);
            return callback(response);
        } catch(err) {
            if (err instanceof CustomError) {
                throw err;
            }
            throw new DataBaseError(err as Error);
        } finally {
            if (client){
                client.release()
            }
        }
    }
}