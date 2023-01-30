import { CheckTokenUseCase } from '$/domain/usecases/check-token';
import Joi from 'joi';
import { joiHelpers } from '../helpers';

export const checkTokenValidator = joiHelpers.makeValidator(
  Joi.object<CheckTokenUseCase.Data>({
    headers: Joi.object<CheckTokenUseCase.Data['headers']>({
      authorization: Joi.string().required().pattern(/Bearer\s.+/),
    }),
  })
);