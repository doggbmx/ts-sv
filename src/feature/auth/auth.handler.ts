import { NextFunction, Request, Response } from "express";

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