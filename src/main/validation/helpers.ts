import { Request } from 'express';
import { Schema } from 'joi';

export const joiHelpers = {
  makeValidator: <T>(schema: Schema<T>) => {
    return async (req: Request): Promise<T> => {
      const { headers, body, params, query } = req;
      const value = await schema
        .options({ allowUnknown: true, abortEarly: false })
        .validateAsync({ headers, body, params, query });
      return value as T;
    };
  },
};
