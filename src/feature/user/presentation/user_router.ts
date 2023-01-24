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
            res.send(users);
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await usersRepository.getUser(id);
            res.send(user);
        } catch (err) {
            next(err);
        }
    })

    return router;
}