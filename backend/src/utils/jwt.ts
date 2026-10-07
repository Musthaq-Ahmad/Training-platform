import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export type UserRole = 'trainee' | 'admin';

export interface JwtPayload {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export function signJwt(payload: JwtPayload) {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  };
  return jwt.sign(payload, env.JWT_SECRET, options);
}

export function verifyJwt(token: string): JwtPayload {
  const decoded = jwt.verify(token, env.JWT_SECRET) as Omit<JwtPayload, 'role'> & {
    role?: UserRole;
  };
  return {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
    role: decoded.role ?? 'trainee',
  };
}
