import { User } from '$/domain/entities/user';
import { Search } from '$/domain/generics/search';

export type GetUserTask = {
  get(where: GetUserTask.Where): Promise<GetUserTask.Result>;
};
export namespace GetUserTask {
  export type Where = Search.Query.Where<User>;
  export type Result = User;
}