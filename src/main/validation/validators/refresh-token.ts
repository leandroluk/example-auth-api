import { RefreshTokenUseCase } from '$/domain/usecases/refresh-token';
import Joi from 'joi';
import { joiHelpers } from '../helpers';

export const refreshTokenValidator = joiHelpers.makeValidator(
  Joi.object<RefreshTokenUseCase.Data>({
    headers: Joi.object<RefreshTokenUseCase.Data['headers']>({
      authorization: Joi.string().required().pattern(/Bearer\s.+/),
    }),
  })
);