import { typeormDataSource } from '$/infra/typeorm/data-source';
import app from '$/main/app';
import vars from '$/vars';
import supertest from 'supertest';

describe('routes/index', () => {
  describe('GET /health', () => {
    const url = '/health';
    it('Should return 500 if cannot connect to db', async () => {
      jest.spyOn(typeormDataSource, 'query').mockRejectedValueOnce(new Error());
      const result = await supertest(app).get(url);
      expect(result.status).toBe(500);
    });

    it('Should return 200 with app info if connect to db', async () => {
      jest.spyOn(typeormDataSource, 'query').mockResolvedValue(undefined);
      const result = await supertest(app).get(url);
      expect(result.status).toBe(200);
      expect(result.body.name).toBe(vars.app.name);
      expect(result.body.version).toBe(vars.app.version);
      expect(result.body.env).toBe(vars.app.env);
      expect(result.body.uptime).toBeDefined();
    });
  });
});