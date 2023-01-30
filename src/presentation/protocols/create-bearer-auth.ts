import { User } from '$/domain/entities/user';
import { BearerAuth } from '$/domain/generics/bearer-auth';

export type CreateBearerAuthTask = {
  create(userId: CreateBearerAuthTask.UserId): Promise<CreateBearerAuthTask.Result>;
};
export namespace CreateBearerAuthTask {
  export type UserId = User['id'];
  export type Result = BearerAuth;
}