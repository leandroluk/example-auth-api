import { BearerAuthorizedHeader } from '../generics/bearer-authorized-header';

/**
 * @see https://github.com/leandroluk/example-auth-api/wiki/Check-Token
 */
export type CheckTokenUseCase = {
  check(data: CheckTokenUseCase.Data): Promise<void>;
};
export namespace CheckTokenUseCase {
  export type Data = {
    headers: BearerAuthorizedHeader;
  };
}