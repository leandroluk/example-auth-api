import { RefreshTokenUseCase } from '$/domain/usecases/refresh-token';
import { CreateBearerAuthTask } from '../protocols/create-bearer-auth';
import { GetUserTask } from '../protocols/get-user';
import { GetUserAuthTask } from '../protocols/get-user-auth';
import { RefreshUserAuthTask } from '../protocols/refresh-user-auth';
import { VerifyTokenAndGetUserIdTask } from '../protocols/verify-token-and-get-user-id';

export class RefreshTokenUseCaseImpl implements RefreshTokenUseCase {
  constructor (
    private readonly verifyTokenAndGetUserIdTask: VerifyTokenAndGetUserIdTask,
    private readonly getUserAuthTask: GetUserAuthTask,
    private readonly getUserTask: GetUserTask,
    private readonly createBearerAuthTask: CreateBearerAuthTask,
    private readonly refreshUserAuthTask: RefreshUserAuthTask
  ) {}

  async refresh(data: RefreshTokenUseCase.Data): Promise<RefreshTokenUseCase.Result> {
    const token = data.headers.authorization.split(' ').pop();
    const userId = await this.verifyTokenAndGetUserIdTask.verify(token);
    const userAuth = await this.getUserAuthTask.get({ accessToken: { eq: token } });
    await this.getUserTask.get({ id: { eq: userId } });
    const bearerAuth = await this.createBearerAuthTask.create(userAuth.userId);
    await this.refreshUserAuthTask.refresh({
      id: userAuth.id,
      changes: {
        accessToken: bearerAuth.accessToken,
        refreshToken: bearerAuth.refreshToken,
      },
    });
    return bearerAuth;
  }
}