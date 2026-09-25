import { type Express, type Request, type Response } from 'express';
import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';

const app: Express = express();

app.use(cors());

app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).send({ status: 'ok' });
});

app.use(errorHandler);

export default app;
