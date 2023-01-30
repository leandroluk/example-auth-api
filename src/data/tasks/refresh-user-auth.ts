import { RefreshUserAuthTask } from '$/presentation/protocols/refresh-user-auth';
import { EditUserAuthRepo } from '../protocols/repos/edit-user-auth';

export class RefreshUserAuthTaskImpl implements RefreshUserAuthTask {
  constructor (
    private readonly editUserAuthRepo: EditUserAuthRepo
  ) {}

  async refresh(data: RefreshUserAuthTask.Data): Promise<void> {
    await this.editUserAuthRepo.edit({
      id: data.id,
      changes: {
        ...data.changes,
        timestamp: new Date(),
      },
    });
  }
}