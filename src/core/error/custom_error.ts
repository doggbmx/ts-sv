export abstract class CustomError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract statusCode: number;
  abstract formatError(): { message: string; field?: string }[];
}
