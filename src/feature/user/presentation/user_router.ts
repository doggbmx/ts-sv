import express, { NextFunction, Request, Response } from 'express';
import { UserRepositories } from '../domain/repositories/user_repositories';

type UserRequestQuery = { userName?: string };

export default function usersRouter(usersRepository: UserRepositories) {
    const router = express.Router();

    router.get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('routerrrr');
            const { userName } = req.query as UserRequestQuery;
            const users = await usersRepository.getUser(userName);
            console.log(users);
           return res.send(users);
        } catch (error) {
            next(error);
        }
    });

    return router;
}