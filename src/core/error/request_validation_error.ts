import { ValidationError } from 'express-validator';
import { CustomError } from './custom_error';

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        super();
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    };

    formatError() {
        return this.errors.map((err) => {
            return { message: err.msg, field: err.param };
        });
    }
}