import { LogoutUseCase } from '$/domain/usecases/logout';
import { GetUserAuthTask } from '../protocols/get-user-auth';
import { RemoveUserAuthTask } from '../protocols/remove-user-auth';
import { VerifyTokenAndGetUserIdTask } from '../protocols/verify-token-and-get-user-id';

export class LogoutUseCaseImpl implements LogoutUseCase {
  constructor (
    private readonly verifyTokenAndGetUserIdTask: VerifyTokenAndGetUserIdTask,
    private readonly getUserAuthTask: GetUserAuthTask,
    private readonly removeUserAuthTask: RemoveUserAuthTask
  ) {}

  async logout(data: LogoutUseCase.Data): Promise<void> {
    const token = data.headers.authorization.split(' ').pop();
    await this.verifyTokenAndGetUserIdTask.verify(token);
    const userAuth = await this.getUserAuthTask.get({ accessToken: { eq: token } });
    await this.removeUserAuthTask.remove(userAuth.id);
  }
}