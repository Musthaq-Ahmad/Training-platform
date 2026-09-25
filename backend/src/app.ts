import { type Express, type Request, type Response } from 'express';
import express from 'express';
import { errorHandler } from './middleware/errorHandler';

const app: Express = express();

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send({ status: 'ok' });
});

app.use(errorHandler);

export default app;
