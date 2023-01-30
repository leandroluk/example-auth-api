import { CreateBearerAuthTask } from '$/presentation/protocols/create-bearer-auth';
import vars from '$/vars';
import { CreateJwtTokenAdapter } from '../protocols/adapters/create-jwt-token';

export class CreateBearerAuthTaskImpl implements CreateBearerAuthTask {
  constructor (
    private readonly createJwtTokenAdapter: CreateJwtTokenAdapter
  ) {}

  async create(userId: CreateBearerAuthTask.UserId): Promise<CreateBearerAuthTask.Result> {
    const [accessToken, refreshToken] = await Promise.all([
      this.createJwtTokenAdapter.create({ subject: userId, expires: vars.jwt.accessTTL }),
      this.createJwtTokenAdapter.create({ subject: userId, expires: vars.jwt.refreshTTL }),
    ]);
    return {
      type: 'Bearer',
      accessToken,
      refreshToken,
    };
  }
}