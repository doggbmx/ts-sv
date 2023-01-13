import { CustomError } from './custom_error';

export class CustomErrorHandler {
    static fromGenericError<CustomError>(message: string) {
        return `ERORR: ${message}`;
    }
}