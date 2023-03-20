import express, { NextFunction, Request, Response } from 'express';
import { User } from "../../user/domain/models/user_model";
import { UserRepositories } from "../../user/domain/repositories/user_repositories";
import passport from 'passport';

export default function AuthRouter() {
    const router = express.Router();

    router.post('/login', 
        passport.authenticate('local', {session: false}), 
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                let user= req.user as Partial<User>; 
                delete user.password;
                res.json(req.user);
            } catch (error) {
                next(error);
            }
        }
    );

    return router;
}