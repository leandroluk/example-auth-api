import { User } from '$/domain/entities/user';

export type VerifyTokenAndGetUserIdTask = {
  verify(token: VerifyTokenAndGetUserIdTask.Token): Promise<VerifyTokenAndGetUserIdTask.Result>;
};
export namespace VerifyTokenAndGetUserIdTask {
  export type Token = string;
  export type Result = User['id'];
}