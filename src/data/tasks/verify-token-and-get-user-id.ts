import { VerifyTokenAndGetUserIdTask } from '$/presentation/protocols/verify-token-and-get-user-id';
import { UnauthorizedError } from '../errors/unauthorized';
import { VerifyJwtTokenAdapter } from '../protocols/adapters/verify-jwt-token';

export class VerifyTokenAndGetUserIdTaskImpl implements VerifyTokenAndGetUserIdTask {
  constructor (
    private readonly verifyJwtTokenAdapter: VerifyJwtTokenAdapter
  ) {}

  async verify(token: VerifyTokenAndGetUserIdTask.Token): Promise<VerifyTokenAndGetUserIdTask.Result> {
    try {
      const userId = await this.verifyJwtTokenAdapter.verify(token);
      return userId;
    } catch (error) {
      throw new UnauthorizedError(error.message);
    }
  }
}