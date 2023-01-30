import logger from '$/logger';
import expressWinston from 'express-winston';

export const loggerMiddleware = expressWinston.logger({ winstonInstance: logger });