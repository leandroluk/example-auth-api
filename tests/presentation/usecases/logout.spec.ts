import { LogoutUseCase } from '$/domain/usecases/logout';
import { LogoutUseCaseImpl } from '$/presentation/usecases/logout';
import { MockGetUserAuthTask } from 'mocks/presentation/protocols/get-user-auth';
import { MockRemoveUserAuthTask } from 'mocks/presentation/protocols/remove-user-auth';
import { MockVerifyTokenAndGetUserIdTask } from 'mocks/presentation/protocols/verify-token-and-get-user-id';

const makeSut = (): {
  verifyTokenAndGetUserIdTask: MockVerifyTokenAndGetUserIdTask;
  getUserAuthTask: MockGetUserAuthTask;
  removeUserAuthTask: MockRemoveUserAuthTask;
  sut: LogoutUseCaseImpl;
  data: LogoutUseCase.Data;
} => {
  const verifyTokenAndGetUserIdTask = new MockVerifyTokenAndGetUserIdTask();
  const getUserAuthTask = new MockGetUserAuthTask();
  const removeUserAuthTask = new MockRemoveUserAuthTask();

  const sut = new LogoutUseCaseImpl(
    verifyTokenAndGetUserIdTask,
    getUserAuthTask,
    removeUserAuthTask
  );
  const data: LogoutUseCase.Data = {
    headers: {
      authorization: 'Bearer accessToken',
    },
  };
  return {
    verifyTokenAndGetUserIdTask,
    getUserAuthTask,
    removeUserAuthTask,
    sut,
    data,
  };
};

describe('LogoutUseCaseImpl', () => {
  it('Should throw if verifyTokenAndGetUserIdTask throws', async () => {
    const { sut, verifyTokenAndGetUserIdTask, data } = makeSut();
    jest.spyOn(verifyTokenAndGetUserIdTask, 'verify').mockRejectedValue(new Error());
    await expect(sut.logout(data)).rejects.toThrow();
  });

  it('Should throw if getUserAuthTask throws', async () => {
    const { sut, getUserAuthTask, data } = makeSut();
    jest.spyOn(getUserAuthTask, 'get').mockRejectedValue(new Error());
    await expect(sut.logout(data)).rejects.toThrow();
  });

  it('Should throw if removeUserAuthTask throws', async () => {
    const { sut, removeUserAuthTask, data } = makeSut();
    jest.spyOn(removeUserAuthTask, 'remove').mockRejectedValue(new Error());
    await expect(sut.logout(data)).rejects.toThrow();
  });

  it('Should return if remove userAuth', async () => {
    const { sut, data } = makeSut();
    await expect(sut.logout(data)).resolves.toBeUndefined();
  });
});