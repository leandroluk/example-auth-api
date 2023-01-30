import { GetUserAuthTask } from '$/presentation/protocols/get-user-auth';
import { GetUserAuthRepo } from '../protocols/repos/get-user-auth';

export class GetUserAuthTaskImpl implements GetUserAuthTask {
  constructor (
    private readonly getUserAuthRepo: GetUserAuthRepo,
    private readonly notFoundError: Error,
    private readonly removedError: Error
  ) {}

  async get(where: GetUserAuthTask.Where): Promise<GetUserAuthTask.Result> {
    const userAuth = await this.getUserAuthRepo.get(where);
    if (!userAuth) throw this.notFoundError;
    if (userAuth.removed) throw this.removedError;
    return userAuth;
  }
}