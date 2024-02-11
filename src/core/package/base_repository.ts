import { CustomError } from "../error/custom_error";
import { GenericError } from "../error/generic_error";


export class BaseRepository {
  async callDataSource<T>(callback: () => Promise<T>): Promise<T> {
    try {
      return await callback();
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new GenericError(`${this.constructor.name} error`);
    }
  }
}
