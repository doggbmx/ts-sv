import { CustomError } from './custom_error';

export class GenericError extends CustomError {
    statusCode = 500;
    errorMessage: string;

    formatError(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.errorMessage }];
    }
}