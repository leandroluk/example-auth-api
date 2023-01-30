import { typeormDataSource } from '$/infra/typeorm/data-source';
import swaggerDocs from '$/main/swagger';
import vars from '$/vars';
import { Router } from 'express';
import ms from 'ms';
import swaggerUI from 'swagger-ui-express';
import apiRoutes from './api';

const routes = Router();

routes.use('/api', apiRoutes);

if (vars.app.env !== 'production') {
  routes.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
}

routes.use('/health', async (_req, res) => {
  await typeormDataSource.query('SELECT 1');
  res.json({
    name: vars.app.name,
    version: vars.app.version,
    env: vars.app.env,
    uptime: ms(process.uptime() * 1000),
  });
});

export default routes;