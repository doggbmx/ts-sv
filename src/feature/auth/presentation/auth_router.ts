import express, { NextFunction, Request, Response } from 'express';
import { UserRepositories } from "../../user/domain/repositories/user_repositories";
import passport from 'passport';

export default function AuthRouter() {
    const router = express.Router();

    router.post('/login', 
        passport.authenticate('local', {session: false}), 
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                res.send('HELLOOOOOOOOOOOOOOOO')
                // res.json(req.user);
            } catch (error) {
                next(error);
            }
        }
    );

    return router;
}