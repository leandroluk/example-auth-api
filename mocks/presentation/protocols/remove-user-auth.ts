import { RemoveUserAuthTask } from '$/presentation/protocols/remove-user-auth';

export class MockRemoveUserAuthTask implements RemoveUserAuthTask {
  async remove(_id: RemoveUserAuthTask.Id): Promise<void> {
  }
}