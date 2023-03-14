import express, { Application } from 'express';
import { usersRouter } from '../../feature/user/presentation';
import { authRouter } from '../../feature/auth/presentation';


export const configureRouting = (app: Application) => {
    const router = express.Router();
    app.use('/api', router);
    router.use('/auth', authRouter);
    router.use('/users', usersRouter);
};