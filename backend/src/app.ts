import { type Express, type Request, type Response } from 'express';
import express from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';
import { notFoundHandler } from './middleware/notFoundHandler';
import passport from './module/auth-module/passport';
import authRoutes from './module/auth-module/auth.routes';
import { env } from './config/env';
import profileRoutes from './module/profile-module/profile.routes';
import { requireAuth } from './middleware/authMiddleware';
import { dashboardRoutes } from './module/dashboard-module/dashboard.routes';
import { courseRoutes } from './module/dashboard-module/dashboard.routes';
import taskRoutes from './module/task-module/task.routes';

const app: Express = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(passport.initialize());

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).send({ status: 'ok' });
});

app.use('/api/auth', authRoutes);

app.use('/api/profile', requireAuth, profileRoutes);
app.use('/api/dashboard', requireAuth, dashboardRoutes);
app.use('/api/courses', requireAuth, courseRoutes);
app.use('/api/tasks', requireAuth, taskRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
