import { AddUserAuthRepo } from '$/data/protocols/repos/add-user-auth';
import { typeormDataSource } from '../data-source';
import { UserAuthEntity } from '../entities/user-auth';

export class AddUserAuthRepoImpl implements AddUserAuthRepo {
  async add(data: AddUserAuthRepo.Data): Promise<void> {
    await typeormDataSource
      .createQueryBuilder()
      .insert()
      .into(UserAuthEntity)
      .values(data)
      .execute();
  }
}