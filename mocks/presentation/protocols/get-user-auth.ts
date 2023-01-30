import { GetUserAuthTask } from '$/presentation/protocols/get-user-auth';
import { mockUserAuth } from 'mocks/domain/models/user-auth';

export class MockGetUserAuthTask implements GetUserAuthTask {
  constructor (
    public $get: GetUserAuthTask.Result = { ...mockUserAuth }
  ) {}

  async get(_where: GetUserAuthTask.Where): Promise<GetUserAuthTask.Result> {
    return this.$get;
  }
}