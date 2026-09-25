import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send({ status: 'ok' });
});

export default app;
