import logger from '$/logger';
import { ErrorRequestHandler } from 'express';

const errors: Record<string, number> = {
  ValidationError: 400,
  UnauthorizedError: 401,
  ForbiddenError: 403,
};

export const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message, stack: _, ...rest } = err;
  const status = errors[name];
  if (status) return res.status(status).json({ name, message, ...rest });
  res.sendStatus(500);
  logger.error(err);
};
