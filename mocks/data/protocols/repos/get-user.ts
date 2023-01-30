import { GetUserRepo } from '$/data/protocols/repos/get-user';
import { mockUser } from 'mocks/domain/models/user';

export class MockGetUserRepo implements GetUserRepo {
  constructor (
    public $get: GetUserRepo.Result = { ...mockUser }
  ) {}

  async get(_query: GetUserRepo.Where): Promise<GetUserRepo.Result> {
    return this.$get;
  }
}