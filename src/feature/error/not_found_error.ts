import { CustomError } from './custom_error';

export class NotFoundError extends CustomError {
    statusCode = 404;
    resource: string;
    
    formatError(): { message: string; field?: string | undefined; }[] {
        return [{message: `${this.resource} not found.`}];
    }

}