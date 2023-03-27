import express, { NextFunction, Request, Response } from 'express';
import { User } from "../../user/domain/models/user_model";
import jwt ,{ Secret } from 'jsonwebtoken'

import passport from 'passport';
import { config } from '../../../core/config/config';

export default function AuthRouter() {
    const router = express.Router();

    router.post('/login', 
        passport.authenticate('local', {session: false}), 
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                let user= req.user as Partial<User>;
                const payload = {
                    sub: user.userId,
                    name: user.name,
                    email: user.email,
                };
                const token = jwt.sign(payload, config.jwtSecret as Secret, {
                    expiresIn: '1d',
                });
                delete user.password;
                res.json({
                    user,
                    token,
                });
            } catch (error) {
                next(error);
            }
        }
    );

    return router;
}