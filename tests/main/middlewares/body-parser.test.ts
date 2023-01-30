import { bodyParserMiddleware } from '$/main/middlewares/body-parser';
import express from 'express';
import supertest from 'supertest';

describe('bodyParserMiddleware', () => {
  const url = '/bodyParserMiddleware';
  const app = express()
    .use(bodyParserMiddleware)
    .use(url, (req, res) => res.json(req.body));

  it('Should return 200 and parse request body', async () => {
    const body = { a: 'a', b: 1, c: true };
    const result = await supertest(app).post(url).send(body);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(body);
  });
});