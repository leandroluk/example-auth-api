import { GetUserTask } from '$/presentation/protocols/get-user';
import { mockUser } from 'mocks/domain/models/user';

export class MockGetUserTask implements GetUserTask {
  constructor (
    public $get: GetUserTask.Result = { ...mockUser }
  ) {}

  async get(_where: GetUserTask.Where): Promise<GetUserTask.Result> {
    return this.$get;
  }
}