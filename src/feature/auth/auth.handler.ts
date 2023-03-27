import { NextFunction, Request, Response } from "express";
import { User } from "../user/domain/models/user_model";

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['api'];
    console.log(apiKey);
    if (apiKey == '123') {
        next();
    } else {
        return res.status(401).send({
            error: 'NOPE BRO'
        });
    }
}

export function checkIsManu(req: Request, res: Response, next: NextFunction) {
    const user = req.user as User;
    console.log(user);
    if (user.name == 'manu') {
        next();
    } else {
        return res.status(403).send({
            error: 'NO ERES MANU'
        });
    }
}