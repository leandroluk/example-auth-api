import express, { RequestHandler } from 'express';

export const bodyParserMiddleware: RequestHandler = express.json();
