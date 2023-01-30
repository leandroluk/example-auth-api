import { ForbiddenError } from '$/data/errors/forbidden';
import { UnauthorizedError } from '$/data/errors/unauthorized';
import { GetUserTaskImpl } from '$/data/tasks/get-user';
import { GetUserAuthTaskImpl } from '$/data/tasks/get-user-auth';
import { VerifyTokenAndGetUserIdTaskImpl } from '$/data/tasks/verify-token-and-get-user-id';
import { CheckTokenUseCase } from '$/domain/usecases/check-token';
import { VerifyJwtTokenAdapterImpl } from '$/infra/adapters/verify-jwt-token';
import { GetUserRepoImpl } from '$/infra/typeorm/repos/get-user';
import { GetUserAuthRepoImpl } from '$/infra/typeorm/repos/get-user-auth';
import { CheckTokenUseCaseImpl } from '$/presentation/usecases/check-token';

let instance: CheckTokenUseCase;

export const checkTokenFactory = (): CheckTokenUseCase => {
  if (!instance) {
    const verifyJwtTokenAdapter = new VerifyJwtTokenAdapterImpl();
    const verifyTokenAndGetUserIdTask = new VerifyTokenAndGetUserIdTaskImpl(
      verifyJwtTokenAdapter
    );
    const unauthorizedError = new UnauthorizedError();
    const forbiddenError = new ForbiddenError();
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
      forbiddenError
    );
    instance = new CheckTokenUseCaseImpl(
      verifyTokenAndGetUserIdTask,
      getUserAuthTask,
      getUserTask
    );
  }
  return instance;
};