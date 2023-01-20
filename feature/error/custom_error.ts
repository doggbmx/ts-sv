export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract formatError(): { message: string, field?: string }[];
}