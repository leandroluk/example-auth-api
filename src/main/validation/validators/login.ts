import { LoginUseCase } from '$/domain/usecases/login';
import Joi from 'joi';
import { joiHelpers } from '../helpers';

export const loginValidator = joiHelpers.makeValidator(
  Joi.object<LoginUseCase.Data>({
    body: Joi.object<LoginUseCase.Data['body']>({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  })
);
