import { VerifyTokenAndGetUserIdTask } from '$/presentation/protocols/verify-token-and-get-user-id';

export class MockVerifyTokenAndGetUserIdTask implements VerifyTokenAndGetUserIdTask {
  constructor (
    public $get: VerifyTokenAndGetUserIdTask.Result = 'userId'
  ) {}

  async verify(_token: VerifyTokenAndGetUserIdTask.Token): Promise<VerifyTokenAndGetUserIdTask.Result> {
    return this.$get;
  }
}