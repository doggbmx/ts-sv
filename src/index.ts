import express from 'express';
import { configureRouting } from './core/routing';

const app = express();

app.use(express.json());
// config del router
configureRouting(app);

app.listen(4200, () => {
    console.log('corriendo en el 4200');
})