import { GetUserAuthRepo } from '$/data/protocols/repos/get-user-auth';
import { UserAuthEntity } from '../entities/user-auth';
import { typeormHelper } from '../helper';

export class GetUserAuthRepoImpl implements GetUserAuthRepo {
  async get(where: GetUserAuthRepo.Where): Promise<GetUserAuthRepo.Result> {
    const result = await typeormHelper
      .searchQuery2Builder(UserAuthEntity, { where })
      .getOne();
    return result;
  }
}