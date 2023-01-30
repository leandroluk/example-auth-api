import vars from '$/vars';
import { DataSource } from 'typeorm';
export const typeormDataSource = new DataSource({
  type: 'postgres',
  url: vars.db.postgres,
  synchronize: false,
  logging: vars.app.env !== 'production',
  entities: ['./entities/*.ts'],
});