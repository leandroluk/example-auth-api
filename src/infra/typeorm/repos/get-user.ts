import { GetUserRepo } from '$/data/protocols/repos/get-user';
import { UserEntity } from '../entities/user';
import { typeormHelper } from '../helper';

export class GetUserRepoImpl implements GetUserRepo {
  async get(where: GetUserRepo.Where): Promise<GetUserRepo.Result> {
    const result = await typeormHelper
      .searchQuery2Builder(UserEntity, { where })
      .getOne();
    return result;
  }
}