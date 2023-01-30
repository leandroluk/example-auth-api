import { GetUserAuthRepo } from '$/data/protocols/repos/get-user-auth';
import { mockUserAuth } from 'mocks/domain/models/user-auth';

export class MockGetUserAuthRepo implements GetUserAuthRepo {
  constructor (
    public $get: GetUserAuthRepo.Result = { ...mockUserAuth }
  ) {}

  async get(_where: GetUserAuthRepo.Where): Promise<GetUserAuthRepo.Result> {
    return this.$get;
  }
}