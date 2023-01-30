import { UserAuth } from '$/domain/entities/user-auth';
import { Indexable } from '$/domain/generics/indexable';

export type EditUserAuthRepo = {
  edit(args: EditUserAuthRepo.Args): Promise<void>;
};
export namespace EditUserAuthRepo {
  export type Args = {
    id: UserAuth['id'],
    changes: Partial<Omit<UserAuth, keyof Indexable>>;
  };
}