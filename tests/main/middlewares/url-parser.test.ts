import { urlParserMiddleware } from '$/main/middlewares/url-parser';
import express from 'express';
import supertest from 'supertest';

describe('urlParserMiddleware', () => {
  const url = '/_middleware/urlParserMiddleware';
  const app = express()
    .use(urlParserMiddleware)
    .use(url, (req, res) => res.json(req.query));

  it('Should return 200 with nested objects', async () => {
    const query = { a: { b: { c: '1' } } };
    const result = await supertest(app).get(url).query(query);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(query);
  });
});
