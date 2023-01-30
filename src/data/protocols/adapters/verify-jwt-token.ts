import { User } from '$/domain/entities/user';

export type VerifyJwtTokenAdapter = {
  verify(token: VerifyJwtTokenAdapter.Token): Promise<VerifyJwtTokenAdapter.Result>;
};
export namespace VerifyJwtTokenAdapter {
  export type Token = string;
  export type Result = User['id'];
}