import { BearerAuth } from '../generics/bearer-auth';
import { BearerAuthorizedHeader } from '../generics/bearer-authorized-header';

/**
 * @see https://github.com/leandroluk/example-auth-api/wiki/Refresh-Token
 */
export type RefreshTokenUseCase = {
  refresh(data: RefreshTokenUseCase.Data): Promise<RefreshTokenUseCase.Result>;
};
export namespace RefreshTokenUseCase {
  export type Data = {
    headers: BearerAuthorizedHeader;
  };
  export type Result = BearerAuth;
}