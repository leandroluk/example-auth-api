import { User } from '$/domain/entities/user';

export type CheckUserPasswordTask = {
  check(args: CheckUserPasswordTask.Args): Promise<void>;
};
export namespace CheckUserPasswordTask {
  export type Args = {
    plain: User['password'];
    hashed: User['password'];
  };
}