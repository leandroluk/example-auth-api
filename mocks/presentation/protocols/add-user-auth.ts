import { AddUserAuthTask } from '$/presentation/protocols/add-user-auth';
import { mockUserAuth } from 'mocks/domain/models/user-auth';

export class MockAddUserAuthTask implements AddUserAuthTask {
  constructor (
    public $add: AddUserAuthTask.Result = { ...mockUserAuth }
  ) {}

  async add(_data: AddUserAuthTask.Data): Promise<AddUserAuthTask.Result> {
    return this.$add;
  }
}