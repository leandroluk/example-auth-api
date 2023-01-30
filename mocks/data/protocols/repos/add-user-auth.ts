import { AddUserAuthRepo } from '$/data/protocols/repos/add-user-auth';

export class MockAddUserAuthRepo implements AddUserAuthRepo {
  async add(_data: AddUserAuthRepo.Data): Promise<void> {
  }
}