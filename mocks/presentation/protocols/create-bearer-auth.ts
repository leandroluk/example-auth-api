import { CreateBearerAuthTask } from '$/presentation/protocols/create-bearer-auth';
import { mockBearerAuth } from 'mocks/domain/generics/bearer-auth';

export class MockCreateBearerAuthTask implements CreateBearerAuthTask {
  constructor (
    public $create: CreateBearerAuthTask.Result = { ...mockBearerAuth }
  ) {}

  async create(_userId: CreateBearerAuthTask.UserId): Promise<CreateBearerAuthTask.Result> {
    return this.$create;
  }
}