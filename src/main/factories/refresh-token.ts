import { ForbiddenError } from '$/data/errors/forbidden';
import { UnauthorizedError } from '$/data/errors/unauthorized';
import { CreateBearerAuthTaskImpl } from '$/data/tasks/create-bearer-auth';
import { GetUserTaskImpl } from '$/data/tasks/get-user';
import { GetUserAuthTaskImpl } from '$/data/tasks/get-user-auth';
import { RefreshUserAuthTaskImpl } from '$/data/tasks/refresh-user-auth';
import { VerifyTokenAndGetUserIdTaskImpl } from '$/data/tasks/verify-token-and-get-user-id';
import { RefreshTokenUseCase } from '$/domain/usecases/refresh-token';
import { CreateJwtTokenAdapterImpl } from '$/infra/adapters/create-jwt-token';
import { VerifyJwtTokenAdapterImpl } from '$/infra/adapters/verify-jwt-token';
import { EditUserAuthRepoImpl } from '$/infra/typeorm/repos/edit-user-auth';
import { GetUserRepoImpl } from '$/infra/typeorm/repos/get-user';
import { GetUserAuthRepoImpl } from '$/infra/typeorm/repos/get-user-auth';
import { RefreshTokenUseCaseImpl } from '$/presentation/usecases/refresh-token';

let instance: RefreshTokenUseCase;

export const refreshTokenFactory = (): RefreshTokenUseCase => {
  if (!instance) {
    const verifyJwtTokenAdapter = new VerifyJwtTokenAdapterImpl();
    const verifyTokenAndGetUserIdTask = new VerifyTokenAndGetUserIdTaskImpl(
      verifyJwtTokenAdapter
    );
    const unauthorizedError = new UnauthorizedError();
    const forbiddenErrro = new ForbiddenError();
    const getUserAuthRepo = new GetUserAuthRepoImpl();
    const getUserAuthTask = new GetUserAuthTaskImpl(
      getUserAuthRepo,
      unauthorizedError,
      unauthorizedError
    );
    const getUserRepo = new GetUserRepoImpl();
    const getUserTask = new GetUserTaskImpl(
      getUserRepo,
      unauthorizedError,
      forbiddenErrro
    );
    const createJwtTokenAdapter = new CreateJwtTokenAdapterImpl();
    const createBearerAuthTask = new CreateBearerAuthTaskImpl(
      createJwtTokenAdapter
    );
    const editUserAuthRepo = new EditUserAuthRepoImpl();
    const refreshUserAuthTask = new RefreshUserAuthTaskImpl(
      editUserAuthRepo
    );
    instance = new RefreshTokenUseCaseImpl(
      verifyTokenAndGetUserIdTask,
      getUserAuthTask,
      getUserTask,
      createBearerAuthTask,
      refreshUserAuthTask
    );
  }
  return instance;
};