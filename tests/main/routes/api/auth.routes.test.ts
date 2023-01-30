import { typeormDataSource } from '$/infra/typeorm/data-source';
import { typeormHelper } from '$/infra/typeorm/helper';
import app from '$/main/app';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import supertest from 'supertest';
import { jwtSubject } from 'tests/helper';

describe('routes/api/auth.routes', () => {
  describe('POST /api/auth/check', () => {
    const url = '/api/auth/check';
    const validHeaders = {
      authorization: 'Bearer token',
    };

    it.each([
      ['"headers.authorization" is required', {}],
      ['"headers.authorization" is empty', { authorization: '' }],
      ['"headers.authorization" has invalid pattern', { authorization: 'invalid' }],
    ])('Should return 400 if %s', async (_, headers) => {
      const result = await supertest(app).post(url).set(headers);
      expect(result.status).toBe(400);
    });

    it('Should return 401 if token is invalid', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockImplementationOnce(() => { throw new Error(); });
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(401);
    });

    it('Should return 401 if userAuth not found', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockReturnValueOnce({ sub: jwtSubject } as any);
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => undefined) } as any);
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(401);
    });

    it('Should return 401 if userAuth is removed', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockReturnValueOnce({ sub: jwtSubject } as any);
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({ removed: 1 })) } as any);
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(401);
    });

    it('Should return 401 if user not found', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockReturnValueOnce({ sub: jwtSubject } as any);
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({})) } as any)
        .mockReturnValueOnce({ getOne: jest.fn(async () => undefined) } as any);
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(401);
    });

    it('Should return 403 if user is removed', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockReturnValueOnce({ sub: jwtSubject } as any);
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({})) } as any)
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({ removed: 1 })) } as any);
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(403);
    });

    it('Should return 202 if token is checked', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockReturnValueOnce({ sub: jwtSubject } as any);
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({})) } as any)
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({})) } as any);
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(202);
    });
  });

  describe('POST /api/auth/login', () => {
    const url = '/api/auth/login';
    const validBody = {
      email: 'user@email.com',
      password: 'Test@123',
    };

    it.each([
      ['"body.email" is required', { ...validBody, email: undefined }],
      ['"body.email" is empty', { ...validBody, email: '' }],
      ['"body.password" is required', { ...validBody, password: undefined }],
      ['"body.password" is empty', { ...validBody, password: '' }],
    ])('Should return 400 if %s', async (_, body) => {
      const result = await supertest(app).post(url).send(body);
      expect(result.status).toBe(400);
    });

    it('Should return 401 if user not found', async () => {
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => undefined) } as any);
      const result = await supertest(app).post(url).send(validBody);
      expect(result.status).toBe(401);
    });

    it('Should return 403 if user is removed', async () => {
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({ removed: 1 })) } as any);
      const result = await supertest(app).post(url).send(validBody);
      expect(result.status).toBe(403);
    });

    it('Should return 401 if password is not same', async () => {
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({ password: '' })) } as any);
      jest.spyOn(crypto, 'createHmac')
        .mockReturnValueOnce({ update: () => ({ digest: () => 'hashed' }) } as any);
      const result = await supertest(app).post(url).send(validBody);
      expect(result.status).toBe(401);
    });

    it('Should return 200 with bearerAuth if password is same', async () => {
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({ password: '' })) } as any);
      jest.spyOn(crypto, 'createHmac')
        .mockReturnValueOnce({ update: () => ({ digest: () => '' }) } as any);
      jest.spyOn(typeormDataSource, 'createQueryBuilder')
        .mockReturnValueOnce({
          insert: () => ({ into: () => ({ values: () => ({ execute: async () => {} }) }) }),
        } as any);
      const result = await supertest(app).post(url).send(validBody);
      expect(result.status).toBe(200);
      expect(result.body.type).toBe('Bearer');
      expect(result.body.accessToken).toBeDefined();
      expect(result.body.refreshToken).toBeDefined();
    });
  });

  describe('POST /api/auth/logout', () => {
    const url = '/api/auth/logout';
    const validHeaders = {
      authorization: 'Bearer token',
    };

    it.each([
      ['"headers.authorization" is required', {}],
      ['"headers.authorization" is empty', { authorization: '' }],
      ['"headers.authorization" has invalid pattern', { authorization: 'invalid' }],
    ])('Should return 400 if %s', async (_, headers) => {
      const result = await supertest(app).post(url).set(headers);
      expect(result.status).toBe(400);
    });

    it('Should return 401 if token is invalid', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockImplementationOnce(() => { throw new Error(); });
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(401);
    });

    it('Should return 401 if userAuth not found', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockReturnValueOnce({ sub: jwtSubject } as any);
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => undefined) } as any);
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(401);
    });

    it('Should return 401 if userAuth is removed', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockReturnValueOnce({ sub: jwtSubject } as any);
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({ removed: 1 })) } as any);
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(401);
    });

    it('Should return 204 if logout', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockReturnValueOnce({ sub: jwtSubject } as any);
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({})) } as any)
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({})) } as any);
      jest.spyOn(typeormDataSource, 'createQueryBuilder')
        .mockReturnValueOnce({
          update: () => ({ set: () => ({ where: () => ({ execute: async () => {} }) }) }),
        } as any);
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(204);
    });
  });

  describe('POST /api/auth/refresh', () => {
    const url = '/api/auth/refresh';
    const validHeaders = {
      authorization: 'Bearer token',
    };

    it.each([
      ['"headers.authorization" is required', {}],
      ['"headers.authorization" is empty', { authorization: '' }],
      ['"headers.authorization" has invalid pattern', { authorization: 'invalid' }],
    ])('Should return 400 if %s', async (_, headers) => {
      const result = await supertest(app).post(url).set(headers);
      expect(result.status).toBe(400);
    });

    it('Should return 401 if token is invalid', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockImplementationOnce(() => { throw new Error(); });
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(401);
    });

    it('Should return 401 if userAuth not found', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockReturnValueOnce({ sub: jwtSubject } as any);
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => undefined) } as any);
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(401);
    });

    it('Should return 401 if userAuth is removed', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockReturnValueOnce({ sub: jwtSubject } as any);
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({ removed: 1 })) } as any);
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(401);
    });

    it('Should return 401 if user not found', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockReturnValueOnce({ sub: jwtSubject } as any);
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({})) } as any)
        .mockReturnValueOnce({ getOne: jest.fn(async () => undefined) } as any);
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(401);
    });

    it('Should return 403 if user is removed', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockReturnValueOnce({ sub: jwtSubject } as any);
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({})) } as any)
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({ removed: 1 })) } as any);
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(403);
    });

    it('Should return 200 with new bearerAUth', async () => {
      jest.spyOn(jsonwebtoken, 'verify')
        .mockReturnValueOnce({ sub: jwtSubject } as any);
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({})) } as any)
        .mockReturnValueOnce({ getOne: jest.fn(async () => ({})) } as any);
      jest.spyOn(typeormDataSource, 'createQueryBuilder')
        .mockReturnValueOnce({
          update: () => ({ set: () => ({ where: () => ({ execute: async () => {} }) }) }),
        } as any);
      const result = await supertest(app).post(url).set(validHeaders);
      expect(result.status).toBe(200);
      expect(result.body.type).toBe('Bearer');
      expect(result.body.accessToken).toBeDefined();
      expect(result.body.refreshToken).toBeDefined();
    });
  });
});