import { UserAuth } from '$/domain/entities/user-auth';
import { Entity } from '$/domain/generics/entity';

export type AddUserAuthTask = {
  add(data: AddUserAuthTask.Data): Promise<AddUserAuthTask.Result>;
};
export namespace AddUserAuthTask {
  export type Data = Omit<UserAuth, keyof Entity>;
  export type Result = UserAuth;
}