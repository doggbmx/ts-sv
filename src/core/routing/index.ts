import express, { Application } from 'express';
import { authRouter, userRouter } from '../dependency_injection';


export const configureRouting = (app: Application) => {
    const router = express.Router();
    app.use('/api', router);
    router.use('/auth', authRouter);
    router.use('/users', userRouter);
};