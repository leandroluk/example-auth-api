import express, { RequestHandler } from 'express';

export const urlParserMiddleware: RequestHandler = express.urlencoded({ extended: true });
