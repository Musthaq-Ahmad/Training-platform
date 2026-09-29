import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { signJwt, verifyJwt } from './jwt';

const payload = { id: 'u1', name: 'Test Trainee', email: 'trainee@vonnue.com' };

const nowInSeconds = () => Math.floor(Date.now() / 1000);

describe('signJwt', () => {
  it('JWT-01: returns a three-part token with id, name, email, iat and exp', () => {
    const token = signJwt(payload);

    expect(token.split('.')).toHaveLength(3);

    const decoded = jwt.decode(token) as { iat: number; exp: number };
    expect(decoded).toMatchObject(payload);
    expect(typeof decoded.iat).toBe('number');
    expect(typeof decoded.exp).toBe('number');
  });

  it('JWT-02: expires after JWT_EXPIRES_IN', () => {
    const decoded = jwt.decode(signJwt(payload)) as { iat: number; exp: number };

    // test env setup uses JWT_EXPIRES_IN=1h
    expect(decoded.exp - decoded.iat).toBe(3600);
  });
});

describe('verifyJwt', () => {
  it('JWT-03: returns the payload for a valid token', () => {
    expect(verifyJwt(signJwt(payload))).toMatchObject(payload);
  });

  it('JWT-04: rejects an expired token', () => {
    const expired = jwt.sign({ ...payload, exp: nowInSeconds() - 60 }, env.JWT_SECRET);

    expect(() => verifyJwt(expired)).toThrow();
  });

  it('JWT-05: rejects a token with a tampered signature', () => {
    const token = signJwt(payload);
    const tampered = `${token.slice(0, -2)}xx`;

    expect(() => verifyJwt(tampered)).toThrow();
  });

  it('JWT-05b: rejects a token whose payload was edited but not re-signed', () => {
    const [header, , signature] = signJwt(payload).split('.');
    const forgedPayload = Buffer.from(
      JSON.stringify({ ...payload, email: 'admin@vonnue.com' })
    ).toString('base64url');

    expect(() => verifyJwt(`${header}.${forgedPayload}.${signature}`)).toThrow();
  });

  it('JWT-06: rejects a token signed with a different secret', () => {
    const forged = jwt.sign(payload, 'some-other-secret');

    expect(() => verifyJwt(forged)).toThrow();
  });

  it('JWT-07: rejects a malformed token', () => {
    expect(() => verifyJwt('garbage')).toThrow();
    expect(() => verifyJwt('')).toThrow();
  });

  it('JWT-08: rejects an unsigned token (alg: none)', () => {
    const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString('base64url');
    const unsigned = `${encode({ alg: 'none', typ: 'JWT' })}.${encode({ ...payload, exp: nowInSeconds() + 3600 })}.`;

    expect(() => verifyJwt(unsigned)).toThrow();
  });
});
