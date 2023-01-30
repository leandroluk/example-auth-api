import { EditUserAuthRepo } from '$/data/protocols/repos/edit-user-auth';
import { typeormDataSource } from '../data-source';
import { UserAuthEntity } from '../entities/user-auth';

export class EditUserAuthRepoImpl implements EditUserAuthRepo {
  async edit(args: EditUserAuthRepo.Args): Promise<void> {
    await typeormDataSource
      .createQueryBuilder()
      .update(UserAuthEntity)
      .set(args.changes)
      .where('id = :id', { id: args.id })
      .execute();
  }
}