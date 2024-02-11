import { CustomError } from "./custom_error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  resource: string;

  constructor(resource: string) {
    super();
    this.resource = resource;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  formatError(): { message: string; field?: string | undefined }[] {
    return [{ message: `${this.resource} not found.` }];
  }
}
