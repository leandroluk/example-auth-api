import { BearerAuthorizedHeader } from '../generics/bearer-authorized-header';

/**
 * @see https://github.com/leandroluk/example-auth-api/wiki/Logout
 */
export type LogoutUseCase = {
  logout(data: LogoutUseCase.Data): Promise<void>;
};
export namespace LogoutUseCase {
  export type Data = {
    headers: BearerAuthorizedHeader;
  };
}