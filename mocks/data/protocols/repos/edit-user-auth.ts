import { EditUserAuthRepo } from '$/data/protocols/repos/edit-user-auth';

export class MockEditUserAuthRepo implements EditUserAuthRepo {
  async edit(_args: EditUserAuthRepo.Args): Promise<void> {
  }
}