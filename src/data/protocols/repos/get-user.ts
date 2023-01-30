import { User } from '$/domain/entities/user';
import { Search } from '$/domain/generics/search';

export type GetUserRepo = {
  get(query: GetUserRepo.Where): Promise<GetUserRepo.Result>;
};
export namespace GetUserRepo {
  export type Where = Search.Query.Where<User>;
  export type Result = User;
}