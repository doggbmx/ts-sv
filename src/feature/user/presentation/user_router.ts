import express, { NextFunction, Request, Response } from 'express';
import { UserRepositories } from '../domain/repositories/user_repositories';
import { createUserValidator, getUserValidator, updateUserValidator } from './users_middleware';
import { validatorHandler } from '../../../core/middlewares/validation_handler';
import { checkApiKey } from '../../auth/auth.handler';

type UserRequestQuery = { userName?: string };

export default function usersRouter(usersRepository: UserRepositories) {
    const router = express.Router();

    router.get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userName } = req.query as UserRequestQuery;
            const users = await usersRepository.getUser(userName);
            console.log(users);
            res.send(users);
        } catch (error) {
            next(error);
        }
    });
    
    router.get('/auth', checkApiKey , async(req: Request, res: Response, next: NextFunction) => {
        try {
            res.send('LETSSSSGOOOOOOO!!!')
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', ...getUserValidator, validatorHandler, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await usersRepository.getUser(id);
            res.send(user);
        } catch (err) {
            next(err);
        }
    });

    router.post('/', ...createUserValidator, validatorHandler, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newUser = await usersRepository.createUser(req.body);
            res.status(201).send(newUser);
        } catch (err) {
            next(err);
        }
    });

    router.patch('/:id', ...updateUserValidator, validatorHandler, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await usersRepository.updateUser(id, req.body);
            res.send(user);
        } catch (err) {
            next(err);
        }
    });

    router.post('/:userId/techs/:techId', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId, techId } = req.params;
            const newUserTech = await usersRepository.createUserTech(userId, techId);
            res.status(200).send(newUserTech);
        } catch (err) {
            next(err);
        }
    });

    router.get('/:id/techs', checkApiKey, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await usersRepository.getUserWithTech(id);
            res.send(user);
        } catch (error) {
            next(error);
        }
    });

    


    return router;
}