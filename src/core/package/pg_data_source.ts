import { Pool, PoolClient, QueryResult } from "pg";
import { CustomError } from "../error/custom_error";
import { DataBaseError } from "../error/database_error";

export class BasePGDataSource {
  protected db: Pool;
  constructor(db: Pool) {
    this.db = db;
  }
  protected async callDataBase<T>(
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