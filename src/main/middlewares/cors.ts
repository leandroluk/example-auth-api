import { RequestHandler } from 'express';

export const corsMiddleware: RequestHandler = (req, res, next) => {
  res.setHeader('access-control-allow-headers', '*');
  res.setHeader('access-control-allow-methods', '*');
  res.setHeader('access-control-allow-origin', '*');

  req.method === 'OPTIONS' ? res.sendStatus(200) : next();
};
