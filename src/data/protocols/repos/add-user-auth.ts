import { UserAuth } from '$/domain/entities/user-auth';

export type AddUserAuthRepo = {
  add(data: AddUserAuthRepo.Data): Promise<void>;
};
export namespace AddUserAuthRepo {
  export type Data = UserAuth;
}