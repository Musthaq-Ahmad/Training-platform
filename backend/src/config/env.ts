import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(32),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_CALLBACK_URL: z.string().min(1),
  ALLOWED_EMAIL_DOMAIN: z.string().min(1),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default('1h'),
});

// Crashes on startup with a clear message if a variable is missing
export const env = envSchema.parse(process.env);
