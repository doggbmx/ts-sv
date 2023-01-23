import { CustomError } from './custom_error';

export class DataBaseError extends CustomError {
    statusCode = 500;

    constructor(public error: Error) {
      super();
      Object.setPrototypeOf(this, DataBaseError.prototype);
    }

    formatError(): { message: string; field?: string | undefined; }[] {
        return [{message: 'Database error.'}];
    }

}