import { corsMiddleware } from '$/main/middlewares/cors';
import express from 'express';
import supertest from 'supertest';

describe('corsMiddleware', () => {
  const url = '/corsMiddleware';
  const app = express()
    .use(corsMiddleware)
    .use(url, (req, res) => res.status(201).json(req.headers));

  it('Should return 201 and set cors in response headers', async () => {
    const result = await supertest(app).post(url);
    expect(result.status).toBe(201);
    expect(result.headers).toMatchObject({
      'access-control-allow-headers': '*',
      'access-control-allow-methods': '*',
      'access-control-allow-origin': '*',
    });
  });

  it('Should return 200 when access options method', async () => {
    const result = await supertest(app).options(url);
    expect(result.status).toBe(200);
  });
});
