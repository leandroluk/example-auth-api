import { CheckUserPasswordTask } from '$/presentation/protocols/check-user-password';
import { CompareHashAdapter } from '../protocols/adapters/compare-hash';

export class CheckUserPasswordTaskImpl implements CheckUserPasswordTask {
  constructor (
    private readonly compareHashAdapter: CompareHashAdapter,
    private readonly conflitError: Error
  ) {}

  async check(args: CheckUserPasswordTask.Args): Promise<void> {
    const isSamePassword = await this.compareHashAdapter.compare(args);
    if (!isSamePassword) {
      throw this.conflitError;
    }
  }
}