import { LoginUseCase } from '$/domain/usecases/login';
import { LoginUseCaseImpl } from '$/presentation/usecases/login';
import { MockAddUserAuthTask } from 'mocks/presentation/protocols/add-user-auth';
import { MockCheckUserPasswordTask } from 'mocks/presentation/protocols/check-user-password';
import { MockCreateBearerAuthTask } from 'mocks/presentation/protocols/create-bearer-auth';
import { MockGetUserTask } from 'mocks/presentation/protocols/get-user';

const makeSut = (): {
  getUserTask: MockGetUserTask;
  checkUserPasswordTask: MockCheckUserPasswordTask;
  createBearerAuthTask: MockCreateBearerAuthTask;
  addUserAuthTask: MockAddUserAuthTask;
  sut: LoginUseCaseImpl;
  data: LoginUseCase.Data;
} => {
  const getUserTask = new MockGetUserTask();
  const checkUserPasswordTask = new MockCheckUserPasswordTask();
  const createBearerAuthTask = new MockCreateBearerAuthTask();
  const addUserAuthTask = new MockAddUserAuthTask();
  const sut = new LoginUseCaseImpl(
    getUserTask,
    checkUserPasswordTask,
    createBearerAuthTask,
    addUserAuthTask
  );
  const data: LoginUseCase.Data = {
    body: {
      email: 'email',
      password: 'password',
    },
  };
  return {
    getUserTask,
    checkUserPasswordTask,
    createBearerAuthTask,
    addUserAuthTask,
    sut,
    data,
  };
};

describe('LoginUseCaseImpl', () => {
  it('Should throw if getUserTask throws', async () => {
    const { sut, getUserTask, data } = makeSut();
    jest.spyOn(getUserTask, 'get').mockRejectedValue(new Error());
    await expect(sut.login(data)).rejects.toThrow();
  });

  it('Should throw if checkUserPasswordTask throws', async () => {
    const { sut, checkUserPasswordTask, data } = makeSut();
    jest.spyOn(checkUserPasswordTask, 'check').mockRejectedValue(new Error());
    await expect(sut.login(data)).rejects.toThrow();
  });

  it('Should throw if createBearerAuthTask throws', async () => {
    const { sut, createBearerAuthTask, data } = makeSut();
    jest.spyOn(createBearerAuthTask, 'create').mockRejectedValue(new Error());
    await expect(sut.login(data)).rejects.toThrow();
  });

  it('Should throw if addUserAuthTask throws', async () => {
    const { sut, addUserAuthTask, data } = makeSut();
    jest.spyOn(addUserAuthTask, 'add').mockRejectedValue(new Error());
    await expect(sut.login(data)).rejects.toThrow();
  });

  it('Should return bearerAuth', async () => {
    const { sut, createBearerAuthTask, data } = makeSut();
    await expect(sut.login(data)).resolves.toMatchObject({
      type: 'Bearer',
      accessToken: createBearerAuthTask.$create.accessToken,
      refreshToken: createBearerAuthTask.$create.refreshToken,
    });
  });
});