import logger from '$/logger';
import { loggerMiddleware } from '$/main/middlewares/logger';
import express from 'express';
import supertest from 'supertest';

describe('loggerMiddleware', () => {
  const url = '/loggerMiddleware';
  const app = express()
    .use(loggerMiddleware)
    .use(url, (_req, res) => res.sendStatus(200));

  it('Should call logger when access route with this middleware', async () => {
    const logSpy = jest.spyOn(logger, 'log').mockImplementationOnce(jest.fn());
    const result = await supertest(app).get(url);
    expect(result.status).toBe(200);
    expect(logSpy).toBeCalled();
  });
});