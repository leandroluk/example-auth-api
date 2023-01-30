import { UserAuth } from '$/domain/entities/user-auth';
import { Search } from '$/domain/generics/search';

export type GetUserAuthTask = {
  get(where: GetUserAuthTask.Where): Promise<GetUserAuthTask.Result>;
};
export namespace GetUserAuthTask {
  export type Where = Search.Query.Where<UserAuth>;
  export type Result = UserAuth;
}