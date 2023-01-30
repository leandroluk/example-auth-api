import { RefreshTokenUseCase } from '$/domain/usecases/refresh-token';
import { RefreshTokenUseCaseImpl } from '$/presentation/usecases/refresh-token';
import { MockCreateBearerAuthTask } from 'mocks/presentation/protocols/create-bearer-auth';
import { MockGetUserTask } from 'mocks/presentation/protocols/get-user';
import { MockGetUserAuthTask } from 'mocks/presentation/protocols/get-user-auth';
import { MockRefreshUserAuthTask } from 'mocks/presentation/protocols/refresh-user-auth';
import { MockVerifyTokenAndGetUserIdTask } from 'mocks/presentation/protocols/verify-token-and-get-user-id';

const makeSut = (): {
  verifyTokenAndGetUserIdTask: MockVerifyTokenAndGetUserIdTask;
  getUserAuthTask: MockGetUserAuthTask;
  getUserTask: MockGetUserTask;
  createBearerAuthTask: MockCreateBearerAuthTask;
  refreshUserAuthTask: MockRefreshUserAuthTask;
  sut: RefreshTokenUseCaseImpl;
  data: RefreshTokenUseCase.Data;
} => {
  const verifyTokenAndGetUserIdTask = new MockVerifyTokenAndGetUserIdTask();
  const getUserAuthTask = new MockGetUserAuthTask();
  const getUserTask = new MockGetUserTask();
  const createBearerAuthTask = new MockCreateBearerAuthTask();
  const refreshUserAuthTask = new MockRefreshUserAuthTask();
  const sut = new RefreshTokenUseCaseImpl(
    verifyTokenAndGetUserIdTask,
    getUserAuthTask,
    getUserTask,
    createBearerAuthTask,
    refreshUserAuthTask
  );
  const data: RefreshTokenUseCase.Data = {
    headers: {
      authorization: 'Bearer refreshToken',
    },
  };
  return {
    verifyTokenAndGetUserIdTask,
    getUserAuthTask,
    getUserTask,
    createBearerAuthTask,
    refreshUserAuthTask,
    sut,
    data,
  };
};

describe('RefreshTokenUseCaseImpl', () => {
  it('Should throw if verifyTokenAndGetUserIdTask throws', async () => {
    const { sut, verifyTokenAndGetUserIdTask, data } = makeSut();
    jest.spyOn(verifyTokenAndGetUserIdTask, 'verify').mockRejectedValue(new Error());
    await expect(sut.refresh(data)).rejects.toThrow();
  });

  it('Should throw if getUserAuthTask throws', async () => {
    const { sut, getUserAuthTask, data } = makeSut();
    jest.spyOn(getUserAuthTask, 'get').mockRejectedValue(new Error());
    await expect(sut.refresh(data)).rejects.toThrow();
  });

  it('Should throw if getUserTask throws', async () => {
    const { sut, getUserTask, data } = makeSut();
    jest.spyOn(getUserTask, 'get').mockRejectedValue(new Error());
    await expect(sut.refresh(data)).rejects.toThrow();
  });

  it('Should throw if createBearerAuthTask throws', async () => {
    const { sut, createBearerAuthTask, data } = makeSut();
    jest.spyOn(createBearerAuthTask, 'create').mockRejectedValue(new Error());
    await expect(sut.refresh(data)).rejects.toThrow();
  });

  it('Should throw if refreshUserAuthTask throws', async () => {
    const { sut, refreshUserAuthTask, data } = makeSut();
    jest.spyOn(refreshUserAuthTask, 'refresh').mockRejectedValue(new Error());
    await expect(sut.refresh(data)).rejects.toThrow();
  });

  it('Should refresh token and return new bearerAuth', async () => {
    const { sut, createBearerAuthTask, data } = makeSut();
    await expect(sut.refresh(data)).resolves.toMatchObject({
      type: 'Bearer',
      accessToken: createBearerAuthTask.$create.accessToken,
      refreshToken: createBearerAuthTask.$create.refreshToken,
    });
  });
});