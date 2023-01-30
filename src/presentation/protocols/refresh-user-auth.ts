import { UserAuth } from '$/domain/entities/user-auth';

export type RefreshUserAuthTask = {
  refresh(data: RefreshUserAuthTask.Data): Promise<void>;
};
export namespace RefreshUserAuthTask {
  export type Data = {
    id: UserAuth['id'];
    changes: Pick<UserAuth, 'accessToken' | 'refreshToken'>;
  };
}