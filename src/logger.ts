import winston from 'winston';
import vars from './vars';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { app: vars.app },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: '.logs/log.json',
      level: 'debug',
    }),
  ],
});

export default logger;
