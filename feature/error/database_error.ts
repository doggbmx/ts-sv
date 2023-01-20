import { CustomError } from './custom_error';

export class DataBaseError extends CustomError {
    statusCode: number;
    err: Error;

    formatError(): { message: string; field?: string | undefined; }[] {
        return [{message: 'Database error.'}];
    }

}