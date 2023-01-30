import { RemoveUserAuthTask } from '$/presentation/protocols/remove-user-auth';
import { EditUserAuthRepo } from '../protocols/repos/edit-user-auth';

export class RemoveUserAuthTaskImpl implements RemoveUserAuthTask {
  constructor (
    private readonly editUserAuthRepo: EditUserAuthRepo
  ) {}

  async remove(id: RemoveUserAuthTask.Id): Promise<void> {
    await this.editUserAuthRepo.edit({
      id,
      changes: {
        timestamp: new Date(),
        removed: new Date(),
      },
    });
  }
}