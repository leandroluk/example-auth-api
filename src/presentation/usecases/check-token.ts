import { CheckTokenUseCase } from '$/domain/usecases/check-token';
import { GetUserTask } from '../protocols/get-user';
import { GetUserAuthTask } from '../protocols/get-user-auth';
import { VerifyTokenAndGetUserIdTask } from '../protocols/verify-token-and-get-user-id';

export class CheckTokenUseCaseImpl implements CheckTokenUseCase {
  constructor (
    private readonly verifyTokenAndGetUserIdTask: VerifyTokenAndGetUserIdTask,
    private readonly getUserAuthTask: GetUserAuthTask,
    private readonly getUserTask: GetUserTask
  ) {}

  async check(data: CheckTokenUseCase.Data): Promise<void> {
    const token = data.headers.authorization.split(' ').pop();
    const userId = await this.verifyTokenAndGetUserIdTask.verify(token);
    await this.getUserAuthTask.get({ accessToken: { eq: token } });
    await this.getUserTask.get({ id: { eq: userId } });
  }
}