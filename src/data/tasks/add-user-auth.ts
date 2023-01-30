import { AddUserAuthTask } from '$/presentation/protocols/add-user-auth';
import { CreateUuidAdapter } from '../protocols/adapters/create-uuid';
import { AddUserAuthRepo } from '../protocols/repos/add-user-auth';

export class AddUserAuthTaskImpl implements AddUserAuthTask {
  constructor (
    private readonly createUuidAdapter: CreateUuidAdapter,
    private readonly addUserAuthRepo: AddUserAuthRepo
  ) {}

  async add(data: AddUserAuthTask.Data): Promise<AddUserAuthTask.Result> {
    const userAuth: AddUserAuthRepo.Data = {
      ...data,
      id: await this.createUuidAdapter.create(),
      timestamp: new Date(),
      created: new Date(),
    };
    await this.addUserAuthRepo.add(userAuth);
    return userAuth;
  }
}