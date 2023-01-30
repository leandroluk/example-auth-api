import { LoginUseCase } from '$/domain/usecases/login';
import { AddUserAuthTask } from '../protocols/add-user-auth';
import { CheckUserPasswordTask } from '../protocols/check-user-password';
import { CreateBearerAuthTask } from '../protocols/create-bearer-auth';
import { GetUserTask } from '../protocols/get-user';

export class LoginUseCaseImpl implements LoginUseCase {
  constructor (
    private readonly getUserTask: GetUserTask,
    private readonly checkUserPasswordTask: CheckUserPasswordTask,
    private readonly createBearerAuthTask: CreateBearerAuthTask,
    private readonly addUserAuthTask: AddUserAuthTask
  ) {}

  async login(data: LoginUseCase.Data): Promise<LoginUseCase.Result> {
    const user = await this.getUserTask.get({ email: { eq: data.body.email } });
    await this.checkUserPasswordTask.check({ plain: data.body.password, hashed: user.password });
    const bearerAuth = await this.createBearerAuthTask.create(user.id);
    await this.addUserAuthTask.add({
      userId: user.id,
      accessToken: bearerAuth.accessToken,
      refreshToken: bearerAuth.refreshToken,
    });
    return bearerAuth;
  }
}