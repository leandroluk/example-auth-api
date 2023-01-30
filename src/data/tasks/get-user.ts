import { GetUserTask } from '$/presentation/protocols/get-user';
import { GetUserRepo } from '../protocols/repos/get-user';

export class GetUserTaskImpl implements GetUserTask {
  constructor (
    private readonly getUserRepo: GetUserRepo,
    private readonly notFoundError: Error,
    private readonly removedError: Error
  ) {}

  async get(where: GetUserTask.Where): Promise<GetUserTask.Result> {
    const user = await this.getUserRepo.get(where);
    if (!user) throw this.notFoundError;
    if (user.removed) throw this.removedError;
    return user;
  }
}