import { typeormDataSource } from './infra/typeorm/data-source';
import logger from './logger';
import app from './main/app';
import vars from './vars';

typeormDataSource.initialize()
  .then(() => app.listen(vars.port, () => logger.info(`running on ${vars.port}`)))
  .catch((error: Error) => logger.error(error) && process.exit(1));