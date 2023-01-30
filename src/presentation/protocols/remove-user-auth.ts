import { UserAuth } from '$/domain/entities/user-auth';

export type RemoveUserAuthTask = {
  remove(id: RemoveUserAuthTask.Id): Promise<void>;
};
export namespace RemoveUserAuthTask {
  export type Id = UserAuth['id'];
}