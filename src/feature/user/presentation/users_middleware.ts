import { body, param, query } from 'express-validator';

const validateId = () => param('id').isInt().bail().withMessage('Invalid Id');

const validateQueryParam = (value: string, optional = false) => {
    let validation = query(value);
    if (optional) {
        validation = validation.optional();
    }
    return validation.isString().bail().withMessage(`Invalid ${value}`).trim().escape().notEmpty();
};

const validateBodyParam = (value: string, optional = false) => {
    let validation = body(value);
    if (optional) {
        validation = validation.optional();
    }
    return validation.isString().bail().withMessage(`Invalid ${value}`).trim().escape().notEmpty();
};

export const getUserValidator = [validateId()];

export const createUserValidator = [
    validateBodyParam("name").isLength({ min:3 }).withMessage("Invalid name"),
    validateBodyParam("email").isEmail().isLength({ min:3 }).withMessage("Invalid Email"),
    validateBodyParam("password").isLength({ min:8 }).withMessage("Password too short!"),
];

export const updateUserValidator = [
    validateBodyParam("name", true).isLength({min:3}).withMessage("Invalid name"),
    validateBodyParam("email", true).isEmail().isLength({min:3}).withMessage("Invalid Email"),
    validateBodyParam("password", true).isLength({min:8}).withMessage("Password too short!"),
    validateBodyParam("userType", true).isLength({min:3}).withMessage("Invalid sport!")
];