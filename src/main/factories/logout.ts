import { UnauthorizedError } from '$/data/errors/unauthorized';
import { GetUserAuthTaskImpl } from '$/data/tasks/get-user-auth';
import { RemoveUserAuthTaskImpl } from '$/data/tasks/remove-user-auth';
import { VerifyTokenAndGetUserIdTaskImpl } from '$/data/tasks/verify-token-and-get-user-id';
import { LogoutUseCase } from '$/domain/usecases/logout';
import { VerifyJwtTokenAdapterImpl } from '$/infra/adapters/verify-jwt-token';
import { EditUserAuthRepoImpl } from '$/infra/typeorm/repos/edit-user-auth';
import { GetUserAuthRepoImpl } from '$/infra/typeorm/repos/get-user-auth';
import { LogoutUseCaseImpl } from '$/presentation/usecases/logout';

let instance: LogoutUseCase;

export const logoutFactory = (): LogoutUseCase => {
  if (!instance) {
    const verifyJwtTokenAdapter = new VerifyJwtTokenAdapterImpl();
    const verifyTokenAndGetUserIdTask = new VerifyTokenAndGetUserIdTaskImpl(
      verifyJwtTokenAdapter
    );
    const unauthorizedError = new UnauthorizedError();
    const getUserAuthRepo = new GetUserAuthRepoImpl();
    const getUserAuthTask = new GetUserAuthTaskImpl(
      getUserAuthRepo,
      unauthorizedError,
      unauthorizedError
    );
    const editUserAuthRepo = new EditUserAuthRepoImpl();
    const removeUserAuthTask = new RemoveUserAuthTaskImpl(
      editUserAuthRepo
    );
    instance = new LogoutUseCaseImpl(
      verifyTokenAndGetUserIdTask,
      getUserAuthTask,
      removeUserAuthTask
    );
  }
  return instance;
};