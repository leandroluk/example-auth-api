import { ForbiddenError } from '$/data/errors/forbidden';
import { UnauthorizedError } from '$/data/errors/unauthorized';
import { AddUserAuthTaskImpl } from '$/data/tasks/add-user-auth';
import { CheckUserPasswordTaskImpl } from '$/data/tasks/check-user-password';
import { CreateBearerAuthTaskImpl } from '$/data/tasks/create-bearer-auth';
import { GetUserTaskImpl } from '$/data/tasks/get-user';
import { LoginUseCase } from '$/domain/usecases/login';
import { CompareHashAdapterImpl } from '$/infra/adapters/compare-hash';
import { CreateJwtTokenAdapterImpl } from '$/infra/adapters/create-jwt-token';
import { CreateUuidAdapterImpl } from '$/infra/adapters/create-uuid';
import { AddUserAuthRepoImpl } from '$/infra/typeorm/repos/add-user-auth';
import { GetUserRepoImpl } from '$/infra/typeorm/repos/get-user';
import { LoginUseCaseImpl } from '$/presentation/usecases/login';

let instance: LoginUseCase;

export const loginFactory = (): LoginUseCase => {
  if (!instance) {
    const getUserRepo = new GetUserRepoImpl();
    const unauthorizedError = new UnauthorizedError();
    const forbiddenError = new ForbiddenError();
    const getUserTask = new GetUserTaskImpl(
      getUserRepo,
      unauthorizedError,
      forbiddenError
    );
    const compareHashAdapter = new CompareHashAdapterImpl();

    const checkUserPasswordTask = new CheckUserPasswordTaskImpl(
      compareHashAdapter,
      unauthorizedError
    );
    const createJwtTokenAdapter = new CreateJwtTokenAdapterImpl();
    const createBearerAuthTask = new CreateBearerAuthTaskImpl(
      createJwtTokenAdapter
    );
    const createUuidAdapter = new CreateUuidAdapterImpl();
    const addUserAuthRepo = new AddUserAuthRepoImpl();
    const addUserAuthTask = new AddUserAuthTaskImpl(
      createUuidAdapter,
      addUserAuthRepo
    );
    instance = new LoginUseCaseImpl(
      getUserTask,
      checkUserPasswordTask,
      createBearerAuthTask,
      addUserAuthTask
    );
  }
  return instance;
};