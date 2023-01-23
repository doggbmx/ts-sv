import { CustomError } from './custom_error';

export class GenericError extends CustomError {
    statusCode =  500;

    constructor(public errorMessage: string) {
      super();
      Object.setPrototypeOf(this, GenericError.prototype);
    }

    formatError(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.errorMessage }];
    }
}