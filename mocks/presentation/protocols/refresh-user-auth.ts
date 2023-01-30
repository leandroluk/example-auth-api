import { RefreshUserAuthTask } from '$/presentation/protocols/refresh-user-auth';

export class MockRefreshUserAuthTask implements RefreshUserAuthTask {
  async refresh(_data: RefreshUserAuthTask.Data): Promise<void> {
  }
}