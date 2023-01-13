import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('hello');
})

app.listen(8080, () => console.log(`toy escuchando 8080`));