import { LogoutUseCase } from '$/domain/usecases/logout';
import Joi from 'joi';
import { joiHelpers } from '../helpers';

export const logoutValidator = joiHelpers.makeValidator(
  Joi.object<LogoutUseCase.Data>({
    headers: Joi.object<LogoutUseCase.Data['headers']>({
      authorization: Joi.string().required().pattern(/Bearer\s.+/),
    }),
  })
);