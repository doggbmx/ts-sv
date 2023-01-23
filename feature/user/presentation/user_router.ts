import express, { Request, Response } from 'express';
import { UserRepositories } from '../domain/repositories/user_repositories';

type UserRequestQuery = { userName?: string };

export default function usersRouter(usersRepository: UserRepositories) {
    const router = express.Router();

    router.get('/', async (req: Request, res: Response) => {
        try {
            const { userName } = req.query as UserRequestQuery;
            const users = await usersRepository.getUser(userName);
            res.send(users);
        } catch (error) {
            throw error;
        }
    });
}