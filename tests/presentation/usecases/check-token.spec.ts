import { CheckTokenUseCase } from '$/domain/usecases/check-token';
import { CheckTokenUseCaseImpl } from '$/presentation/usecases/check-token';
import { MockGetUserTask } from 'mocks/presentation/protocols/get-user';
import { MockGetUserAuthTask } from 'mocks/presentation/protocols/get-user-auth';
import { MockVerifyTokenAndGetUserIdTask } from 'mocks/presentation/protocols/verify-token-and-get-user-id';

const makeSut = (): {
  verifyTokenAndGetUserIdTask: MockVerifyTokenAndGetUserIdTask;
  getUserAuthTask: MockGetUserAuthTask;
  getUserTask: MockGetUserTask;
  sut: CheckTokenUseCaseImpl;
  data: CheckTokenUseCase.Data;
} => {
  const verifyTokenAndGetUserIdTask = new MockVerifyTokenAndGetUserIdTask();
  const getUserAuthTask = new MockGetUserAuthTask();
  const getUserTask = new MockGetUserTask();

  const sut = new CheckTokenUseCaseImpl(
    verifyTokenAndGetUserIdTask,
    getUserAuthTask,
    getUserTask
  );
  const data: CheckTokenUseCase.Data = {
    headers: {
      authorization: 'Bearer accessToken',
    },
  };
  return {
    verifyTokenAndGetUserIdTask,
    getUserAuthTask,
    getUserTask,
    sut,
    data,
  };
};

describe('CheckTokenUseCaseImpl', () => {
  it('Should throw if verifyTokenAndGetUserIdTask throws', async () => {
    const { sut, verifyTokenAndGetUserIdTask, data } = makeSut();
    jest.spyOn(verifyTokenAndGetUserIdTask, 'verify').mockRejectedValue(new Error());
    await expect(sut.check(data)).rejects.toThrow();
  });

  it('Should throw if getUserAuthTask throws', async () => {
    const { sut, getUserAuthTask, data } = makeSut();
    jest.spyOn(getUserAuthTask, 'get').mockRejectedValue(new Error());
    await expect(sut.check(data)).rejects.toThrow();
  });

  it('Should throw if getUserTask throws', async () => {
    const { sut, getUserTask, data } = makeSut();
    jest.spyOn(getUserTask, 'get').mockRejectedValue(new Error());
    await expect(sut.check(data)).rejects.toThrow();
  });

  it('Should return undefined if token is checked', async () => {
    const { sut, data } = makeSut();
    await expect(sut.check(data)).resolves.toBeUndefined();
  });
});