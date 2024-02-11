import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../error/request_validation_error';

export const validatorHandler = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return next(new RequestValidationError(result.array()));
    }
    next();
}