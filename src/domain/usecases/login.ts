import { User } from '../entities/user';
import { BearerAuth } from '../generics/bearer-auth';

/**
 * @see https://github.com/leandroluk/example-auth-api/wiki/Login
 */
export type LoginUseCase = {
  login(data: LoginUseCase.Data): Promise<LoginUseCase.Result>;
};
export namespace LoginUseCase {
  export type Data = {
    body: Pick<User, 'email' | 'password'>;
  };
  export type Result = BearerAuth;
}