import { UserAuth } from '$/domain/entities/user-auth';
import { Search } from '$/domain/generics/search';

export type GetUserAuthRepo = {
  get(where: GetUserAuthRepo.Where): Promise<GetUserAuthRepo.Result>;
};
export namespace GetUserAuthRepo {
  export type Where = Search.Query.Where<UserAuth>;
  export type Result = UserAuth;
}