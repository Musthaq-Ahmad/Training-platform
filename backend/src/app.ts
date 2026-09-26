import { type Express, type Request, type Response } from 'express';
import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';
import { notFoundHandler } from './middleware/notFoundHandler';
import passport from './module/auth-module/passport';
import authRoutes from './module/auth-module/auth.routes';

const app: Express = express();

app.use(cors());

app.use(express.json());
app.use(passport.initialize());

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).send({ status: 'ok' });
});

app.use('/api/auth', authRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
