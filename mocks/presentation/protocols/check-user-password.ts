import { CheckUserPasswordTask } from '$/presentation/protocols/check-user-password';

export class MockCheckUserPasswordTask implements CheckUserPasswordTask {
  async check(_args: CheckUserPasswordTask.Args): Promise<void> {
  }
}